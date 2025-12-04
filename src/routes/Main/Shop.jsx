import Item from './Item';
import itemsClass from "../../items";
import { Form, useOutletContext, useSubmit } from 'react-router-dom';

function Shop() {
  const [data, error, loading, query, setQuery] = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <>{'Loading...'}</>
  if (data) {
    const items = itemsClass.getItems(query)
    const tags = itemsClass.getTags()
    return (
      <>
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
        <div>
          <p>Items ({items.length})</p>
          {query ? <p>"{query}"<span onClick={() => setQuery('')}>x</span></p> : null}
          {query && items.length === 0 ? <p>No items match the current filters.</p> : null}
          <ul>
            {items.map(item => {
              return <Item key={item.id} item={item} />
            })}
          </ul>
        </div>
      </>
    )
  }
}

function Tag({ tag }) {
  const submit = useSubmit()

  return (
    <Form method='post'>
      <li>
        <label>
          <input 
            type="hidden"
            name='tag'
            value={tag}
          />
          <input 
            type="checkbox"
            checked={itemsClass.getTagFilter().includes(tag)}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          {' '}{tag}
        </label>
      </li>
    </Form>
  )
}

export default Shop
