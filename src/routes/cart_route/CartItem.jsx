import styles from './CartItem.module.css'
import { Link, Form, useSubmit } from 'react-router-dom'
import parsePrice from '../../util/parsePrice'
import RemoveCartItem from '../../../public/Trash'

export default function CartItem({ item }) {
  return (
    <li>
      {!item.stock && <p>Sold Out</p>}

      <div className={styles.cartItemWrapper}>
        <Link to={`/shop/${item.id}`}>
          <div>
            <img
              title={item.name}
              src={item.image}
              alt={item.name + ' image'}
            />
          </div>
        </Link>

        <div className={styles.cartDetailsWrapper}>
          <CartItemDetails item={item} />
          <RemoveCartItemButton id={item.id} />

          <p className={styles.cartItemTotal}>
            Total: {parsePrice(item.qty * item.buyCost)} gold
          </p>

          <CartItemQuantity item={item} />
        </div>
      </div>
    </li>
  )
}

function CartItemDetails({ item }) {
  return (
    <div>
      <h3 className={styles.cartItemName}>{item.name}</h3>

      <div className={styles.cartItemPrices}>
        {item.oldPrice && (
          <p className={styles.oldPrice}>{parsePrice(item.oldPrice)} gold</p>
        )}
        <p>{parsePrice(item.buyCost)} gold</p>
      </div>

      <p>
        Stock: <span className={styles.stockValue}>{parsePrice(item.stock)}</span>
      </p>
    </div>
  )
}

function RemoveCartItemButton({ id }) {
  return (
    <Form method='post' className={styles.cartItemRemove}>
      <button
        type='submit'
        name='itemId'
        value={id}
        aria-label='remove from cart'
      >
        <RemoveCartItem />
      </button>

      <input type='hidden' name='action' value='delete' />
    </Form>
  )
}

function CartItemQuantity({ item }) {
  const submit = useSubmit()

  return (
    <Form method='post' className={styles.cartItemQuantityWrapper}>
      <p className={styles.cartItemQuantityInputWrapper}>
        <button
          className={styles.cartItemQuantityDecrement}
          type='submit'
          name='button'
          value='decrement'
          aria-label='decrement'
        >
          -
        </button>

        <input
          className={styles.cartItemQuantityInput}
          name='qty'
          value={item.qty}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          onChange={(e) => {
            const value = e.target.value
            if (/^\d*$/.test(value)) {
              submit(e.currentTarget.form)
            }
          }}
        />

        <button
          className={styles.cartItemQuantityIncrement}
          type='submit'
          name='button'
          value='increment'
          aria-label='increment'
        >
          +
        </button>

        <input type='hidden' name='stock' value={item.stock} />
        <input type='hidden' name='itemId' value={item.id} />
        <input type='hidden' name='action' value='edit' />
      </p>
    </Form>
  )
}
