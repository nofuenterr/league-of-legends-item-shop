import itemsClass from "../../items";
import { Form, useOutletContext, useSubmit, Link } from 'react-router-dom';

function Shop() {
  const {data, error, loading} = useOutletContext()

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
      <Tags />
    </div>
  )
}

function Tags() {
  const tags = itemsClass.getTags()

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
  const submit = useSubmit()
  const tagFilter = itemsClass.getTagFilter()

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
  const {query, setQuery} = useOutletContext()
  const items = itemsClass.getItems(query)

  return (
    <div>
      <Info items={items} query={query} setQuery={setQuery} />
      <ItemsList items={items} />
    </div>
  )
}

function Info({ items, query, setQuery }) {
  const submit = useSubmit()
  const tagFilter = itemsClass.getTagFilter()

  return (
    <div>
      <p>Items ({items.length})</p>
      <div>
        {query 
          ? <div><span>"{query}"</span><button onClick={() => setQuery('')}>x</button></div> 
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
