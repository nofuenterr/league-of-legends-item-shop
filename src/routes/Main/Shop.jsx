import Item from './Item';
import itemsClass from "../../items";
import { useOutletContext } from 'react-router-dom';

function Shop() {
  const [data, error, loading ] = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <>{'Loading...'}</>
  if (data) {
    const items = itemsClass.getItems()
    return (
      <>
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
