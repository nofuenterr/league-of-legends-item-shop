import styles from './CartItems.module.css'
import CartItem from './CartItem'

function CartItems({ cartItems }) {
  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.cartHeading}>
        Cart
        <sup>
          <span className={styles.cartItemsQuantity}>({cartItems.length})</span>
        </sup>
      </h2>

      <hr />

      <ul className={styles.cartItemsWrapper}>
        {cartItems.map((item) => {
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

export default CartItems