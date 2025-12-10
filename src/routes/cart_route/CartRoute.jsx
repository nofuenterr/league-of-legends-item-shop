import styles from './CartRoute.module.css'
import { useLoaderData, Link } from 'react-router-dom'
import CartItems from './CartItems'
import OrderSummary from './OrderSummary'
import Results from '../../components/Results'

function CartRoute() {
  const [orderSummary, cartItems] = useLoaderData()
  const isCartEmpty = cartItems.length === 0

  if (isCartEmpty) {
    return (
      <Results
        mainHeading='Your cart is empty'
        bottomText='Did you forget to buy items before heading into lane again?'
      >
        <div className={styles.shopNowWrapper}>
          <Link className={styles.shopNow} to={'/shop'} aria-label="shop now" role="button">Shop Now</Link>
        </div>
      </Results>
    )
  }

  return (
    <div className={styles.cartRouteWrapper}>
      <CartItems cartItems={cartItems} />
      <OrderSummary orderSummary={orderSummary} />
    </div>
  )
}

export default CartRoute