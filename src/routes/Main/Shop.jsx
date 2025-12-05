import itemClass from "../../items";
import { Form, useOutletContext, useSubmit, Link, useLoaderData } from 'react-router-dom';

function Shop() {
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

function Loading() {
  return (
    <div>
      <p>Loading items...</p>
    </div>
  )
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
          />
          <span> - </span>
          <input
            name='maxPrice'
            defaultValue={maxPrice}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder="MAX"
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
          >Apply</button>
        </Form>
      </div>
    </div>
  )
}

function Tags() {
  const tags = itemClass.getTags()

  return (
    <div>
      <p>Tags</p>
      <ul>
        {tags.map(tag => {
          return (
            <Tag key={tag} tag={tag} />
          )
        })}
      </ul>
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
  const items = itemClass.getItems()

  return (
    <div>
      <Info items={items} query={query} />
      <ItemsList items={items} />
    </div>
  )
}

function Info({ items, query }) {
  const { tagFilter } = useLoaderData()
  const submit = useSubmit()

  return (
    <div>
      <p>Items ({items.length})</p>
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
    <li>
      <Link to={`/shop/${item.id}`}>
        <div>
          <img src={item.image} alt={item.name + ' image'} />
        </div>
        <p>ID: {item.id}</p>
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>{item.buyCost} Gold</p>
      </Link>
    </li>
  )
}

export default Shop
