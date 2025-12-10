import styles from './CartRoute.module.css'
import { useLoaderData, Link } from 'react-router-dom'
import CartItems from './CartItems'
import OrderSummary from './OrderSummary'

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
      <div className={styles.emptyCartMain}>
        <h1 className={styles.emptyCartMainHeading}>Your cart is empty</h1>
        <div className={styles.shopNowWrapper}>
          <Link className={styles.shopNow} to={'/shop'} aria-label="shop now" role="button">Shop Now</Link>
        </div>
        <div className={styles.emptyCartMainBackground}></div>
      </div>
      <div className={styles.emptyCartBottom}>
        <p>Did you forget to buy items before heading into lane again?</p>
      </div>
    </div>
  )
}

export default CartRoute