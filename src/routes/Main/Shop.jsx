import Item from './Item';
import itemsClass from "../../items";
import { useOutletContext } from 'react-router-dom';

function Shop() {
  const [data, error, loading, query] = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <>{'Loading...'}</>
  if (data) {
    const items = itemsClass.getItems(query)
    return (
      <>
        <p>Items ({items.length})</p>
        {query && items.length === 0 ? <p>No items match the current filters.</p> : null}
        <ul>
          {items.map(item => {
            return <Item key={item.id} item={item} />
          })}
        </ul>
      </>
    )
  }
}

export default Shop
