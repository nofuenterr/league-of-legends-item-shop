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
      Your cart is empty
      <Link to={'/shop'} aria-label='shop now'>
        Shop Now
      </Link>
    </div>
  )
}

export default CartRoute