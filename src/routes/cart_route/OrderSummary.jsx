import styles from './OrderSummary.module.css'
import { Link } from 'react-router-dom'

function OrderSummary({ orderSummary }) {
  const { subtotal, totalQty, vat, total } = orderSummary

  return (
    <div className={styles.orderSummaryWrapper}>
      <h2 className={styles.orderSummaryHeading}>Order Summary</h2>
      <h3 className={styles.orderSummaryTotal}>{total} gold</h3>

      <div className={styles.orderSummaryDetailWrapper}>
        <h3>
          Subtotal ({totalQty} {totalQty > 1 ? 'items' : 'item'})
        </h3>
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

      <button className={styles.checkout} aria-label='checkout'>
        Checkout
      </button>

      <div className={styles.continueShopping}>
        <Link to={'/shop'} aria-label='continue shopping'>
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderSummary