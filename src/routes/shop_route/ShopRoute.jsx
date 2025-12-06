import Loading from '../../components/Loading';
import items from '../../data/items/items';
import tags from '../../data/items/tags';
import { useState } from 'react';
import { Form, useOutletContext, useSubmit, Link, useLoaderData } from 'react-router-dom';

function ShopRoute() {
  const { data, error, loading } = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) {
    return (
      <div>
        <Filters />
        <Items />
      </div>
    )
  }
}

function Filters() {
  return (
    <div>
      <Price />
      <Tags />
    </div>
  )
}

function Price() {
  const { minPrice, maxPrice } = useLoaderData()

  return (
    <div>
      <p>Price</p>
      <div>
        <Form method="post">
          <input
            name='minPrice'
            defaultValue={minPrice}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder="MIN"
            aria-label='min price'
          />
          <span> - </span>
          <input
            name='maxPrice'
            defaultValue={maxPrice}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder="MAX"
            aria-label='max price'
          />
          <button 
            type="submit"
            name="priceFilter"
            value={true}
            onClick={() => {
              if (maxPrice && minPrice > maxPrice) {
                alert('Minimum price must be smaller than maximum price!')
              }
            }}
            aria-label='apply price filter'
          >Apply</button>
        </Form>
      </div>
    </div>
  )
}

function Tags() {
  const [activeTags, setActiveTags] = useState(true) 
  const tagsList = tags.getTags()

  return (
    <div>
      <p onClick={() => setActiveTags(!activeTags)} aria-expanded={activeTags}>Tags</p>
      {activeTags && <ul>
        {tagsList.map(tag => {
          return (
            <Tag key={tag} tag={tag} />
          )
        })}
      </ul>}
    </div>
  )
}

function Tag({ tag }) {
  const { tagFilter } = useLoaderData()
  const submit = useSubmit()

  return (
    <li>
      <Form method='post'>
        <input 
          type="hidden"
          name='tag'
          value={tag}
        />
        <label>
          <input 
            type="checkbox"
            checked={tagFilter.includes(tag)}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          {' '}{tag}
        </label>
      </Form>
    </li>
  )
}

function Items() {
  const { query } = useOutletContext()
  const itemsList = items.getItems()

  return (
    <div>
      <Info items={itemsList} query={query} />
      <ItemsList items={itemsList} />
    </div>
  )
}

function Info({ items, query }) {
  const { tagFilter } = useLoaderData()
  const submit = useSubmit()

  return (
    <div>
      <div>
        <p aria-live='polite' aria-label={items.length + ' items'}>Items ({items.length})</p>
        <div>
          {query 
            ? (
              <div>
                <span>"{query}"</span>
                <Form method="post">
                  <button 
                    type="submit"
                    name="removeQuery"
                    value={true}
                  >x</button>
                </Form>
              </div>
            ) 
            : null}
          {tagFilter.length > 0 
            ? tagFilter.map(tag => {
              return (
                <div key={tag}>
                  <span>{tag}</span>
                  <Form method='post'>
                    <button 
                      name='tag'
                      value={tag}
                      onChange={(e) => {
                        submit(e.currentTarget.form)
                      }}
                    >x</button>
                  </Form>
                </div>
              )
            })
            : null}
        </div>
        {query && items.length === 0 
          ? <p>No items match the current filters.</p> 
          : null}
      </div>
      <Sort />
    </div>
  )
}

function Sort() {
  const { sortBy } = useLoaderData()
  const submit = useSubmit()

  return (
    <div>
      <Form method="post">
        <label>
          Sort by: 
          <select
            defaultValue={sortBy}
            name="sortBy"
            id="sortBy"
            onChange={(e) => submit(e.currentTarget.form)}
          >
            <option value="default">Default</option>
            <option value="a-z">Alphabetically: A-Z</option>
            <option value="z-a">Alphabetically: Z-A</option>
            <option value="low-high">Price: Low to High </option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </label>
      </Form>
    </div>
  )
}

function ItemsList({ items }) {
  return (
    <ul>
      {items.map(item => {
        return <Item key={item.id} item={item} />
      })}
    </ul>
  )
}

function Item({ item }) {
  return (
    <li title={item.name + ': ' + item.buyCost + ' gold'}>
      <Link to={`/shop/${item.id}`}>
        {!item.stock && <p>Sold Out</p>}
        <div>
          <img src={item.image} alt={item.name + ' image'} />
        </div>
        <p>ID: {item.id}</p>
        <p>{item.name}</p>
        <p>{item.description}</p>
        {item.discountPercent && <p>{item.discountPercent}% Off</p>}
        {item.oldPrice && <p style={{textDecoration: 'line-through'}}>Old Price: {item.oldPrice} Gold</p>}
        <p>Price: {item.buyCost} Gold</p>
        <p>Stock: {item.stock}</p>
      </Link>
    </li>
  )
}

export default ShopRoute
