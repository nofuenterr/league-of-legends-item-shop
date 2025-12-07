import { useLoaderData, Link, Form, useSubmit } from 'react-router-dom'
import styles from './CartRoute.module.css'
import RemoveCartItem from '../../../public/Trash'

function CartRoute() {
  const [orderSummary, cartItems] = useLoaderData()

  const isCartEmpty = cartItems.length === 0
  if (isCartEmpty) return <EmptyCart />

  return (
    <div className={styles.cartRouteWrapper}>
      <CartItems cartItems={cartItems} />
      <OrderSummary orderSummary={orderSummary} />
    </div>
  )
}

function EmptyCart() {
  return (
    <div>
      Your cart is empty
      <Link to={'/shop'} aria-label='shop now'>Shop Now</Link>
    </div>
  )
}

function CartItems({ cartItems }) {
  return (
    <div className={styles.cartWrapper}>
      <h2 
        className={styles.cartHeading}
      >
        Cart
        <sup>
          <span 
            className={styles.cartItemsQuantity}
          >
            ({cartItems.length})
          </span>
        </sup>
      </h2>
      <hr />
      <ul className={styles.cartItemsWrapper}>
        {cartItems.map(item => {
          return (
            <>
              <CartItem item={item} key={item.id} />
              <hr />
            </>
          )
        })}
      </ul>
    </div>
  )
}

function CartItem({ item }) {
  const submit = useSubmit()

  return (
    <li>
      {!item.stock && <p>Sold Out</p>}
      <div className={styles.cartItemWrapper}>
        <Link to={`/shop/${item.id}`}>
          <div>
            <img title={item.name} src={item.image} alt={item.name + ' image'} />
          </div>
        </Link>
        <div className={styles.cartDetailsWrapper}>
          <div>
            <h3 className={styles.cartItemName}>{item.name}</h3>
            <div className={styles.cartItemPrices}>
              {item.oldPrice && <p className={styles.oldPrice}>{item.oldPrice} gold</p>}
              <p>{item.buyCost} gold</p>
            </div>
            <p>Stock: <span className={styles.stockValue}>{item.stock}</span></p>
          </div>
          <Form method='post' className={styles.cartItemRemove}>
            <button 
              type='submit'
              name='itemId'
              value={item.id}
              aria-label='remove from cart'
            >
              <RemoveCartItem />
            </button>
            <input 
              type="hidden"
              name='action'
              value='delete'
            />
          </Form>
          <p className={styles.cartItemTotal}>Total: {item.qty * item.buyCost} gold</p>
          <Form method='post' className={styles.cartItemQuantityWrapper}>
            <p className={styles.cartItemQuantityInputWrapper}>
              <button 
                className={styles.cartItemQuantityDecrement}
                type='submit'
                name='button'
                value='decrement'
                aria-label='decrement'
              >-</button>
              <input
                className={styles.cartItemQuantityInput}
                name='qty'
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    submit(e.currentTarget.form)
                  }
                }}
                value={item.qty}
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
              />
              <input 
                type="hidden"
                name='stock'
                value={item.stock}
              />
              <input 
                type="hidden"
                name='itemId'
                value={item.id}
              />
              <input 
                type="hidden"
                name='action'
                value='edit'
              />
              <button 
                className={styles.cartItemQuantityIncrement}
                type='submit'
                name='button'
                value='increment'
                aria-label='increment'
              >+</button>
            </p>
          </Form>
        </div>
      </div>
    </li>
  )
}

function OrderSummary({ orderSummary }) {
  const {subtotal, totalQty, vat, total} = orderSummary

  return (
    <div className={styles.orderSummaryWrapper}>
      <h2 className={styles.orderSummaryHeading}>Order Summary</h2>
      <h3 className={styles.orderSummaryTotal}>{total} gold</h3>
      <div className={styles.orderSummaryDetailWrapper}>
        <h3>Subtotal ({totalQty} {totalQty > 1 ? 'items' : 'item'})</h3>
        <span>{subtotal} gold</span>
      </div>
      <div className={styles.orderSummaryDetailWrapper}>
        <h3>VAT (12%)</h3>
        <span>{vat} gold</span>
      </div>
      <hr />
      <div className={`${styles.orderSummaryDetailWrapper} ${styles.orderSummaryTotal}`}>
        <h3>Total</h3>
        <span>{total} gold</span>
      </div>
      <button className={styles.checkout} aria-label='checkout'>Checkout</button>
      <div className={styles.continueShopping}>
        <Link to={'/shop'} aria-label='continue shopping'>Continue Shopping</Link>
      </div>
    </div>
  )
}

export default CartRoute