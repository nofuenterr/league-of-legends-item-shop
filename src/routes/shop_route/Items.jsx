import formatPrice from '../../util/formatPrice'
import styles from './Items.module.css'
import { Link } from 'react-router-dom'

export default function Items({ items }) {
  return (
    <div>
      <ul className={styles.shopItemsList}>
        {items.map(item => {
          return <Item key={item.id} item={item} />
        })}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li className={styles.shopItemCard} title={item.name + ': ' + item.buyCost + ' gold'}>
      <div className={styles.itemStatusWrapper}>
        <span className={styles.newItemTag}>New</span>
        {!item.stock && <span>Out of Stock</span>}
        {item.discountPercent && <span className={styles.discountTag}>-{item.discountPercent}%</span>}
      </div>
      
      <Link to={`/shop/${item.id}`}>
        <div className={styles.itemImageWrapper}>
          <img className={styles.itemImage} src={item.image} alt={item.name + ' image'} loading='lazy' />
        </div>
      </Link>

      <div className={styles.itemPanel}>
        <h2 className={styles.itemName}>{item.name}</h2>
        <div className={styles.itemPrices}>
          {item.oldPrice 
            && <p
                className={styles.oldPrice} 
                >{formatPrice(item.oldPrice)} gold
              </p>}
          <p>{formatPrice(item.buyCost)} gold</p>
        </div>
      </div>
    </li>
  )
}