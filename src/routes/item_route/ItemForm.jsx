import styles from './ItemForm.module.css'
import { useState } from 'react';
import { Form } from 'react-router-dom'
import formatPrice from '../../util/formatPrice';


export default function ItemForm({ item }) {
  return (
    <Form method='post'>
      <Input stock={item.stock} cartQty={item.qty} />
      <CallToActions stock={item.stock} />
    </Form>
  )
}

function Input({ stock, cartQty }) {
  const [qtyInput, setQtyInput] = useState(1)
  const available = (cartQty + qtyInput) <= stock

  return (
    <div className={styles.quantityInfoWrapper}>
      <p>Stock: <span className={styles.stockValue}>{formatPrice(stock)}</span></p>
      <p className={styles.quantityInputWrapper}>
        <button 
          className={`${styles.quantityDecrement}` 
            + (qtyInput == 1 ? ` ${styles.quantityChangeInvalid}` : '')}
          type='button' 
          onClick={() => {
            if (qtyInput > 1) {
              setQtyInput((q) => q - 1)
            } else {
              setQtyInput(1)
            }
          }}
          aria-label='decrement'
        >-</button>
        
        <input
          className={styles.quantityInput}
          name='qty'
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (/^\d*$/.test(value) && value) {
              setQtyInput(value);
            }
          }}
          value={qtyInput}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
        />

        <button
          className={`${styles.quantityIncrement}` 
            + (!available ? ` ${styles.quantityChangeInvalid}` : '')}
          type='button' 
          onClick={() => {
            setQtyInput((q) => q + 1)
          }}
          aria-label='increment'
        >+</button>

        <input type="hidden" name='available' value={available} />
        <input type="hidden" name='cartQty' value={cartQty} />
      </p>
      {!available 
        ? <p className={styles.addToCartError}>You have reached the maximum quantity available for this item!</p> 
        : null}
    </div>
  )
}

function CallToActions() {
  return (
    <div className={styles.callToActionsWrapper}>
      <button 
        className={styles.addToCart}
        type='submit' 
        aria-label='add to cart'
        /* onClick={() => setQuantity(1)} */
      >
        Add to cart
      </button>

      <button 
        className={styles.buyItNow}
        type='submit' 
        name='buy'
        value={true}
        aria-label='buy it now'
      >
        Buy it now
      </button>

      <input type="hidden" name='addToCart' value={true} />
    </div>
  )
}
