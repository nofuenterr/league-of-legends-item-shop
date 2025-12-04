import { useLoaderData, Link, Form, useSubmit } from 'react-router-dom'

function Cart() {
  const [orderSummary, cartItems] = useLoaderData()

  const isCartEmpty = cartItems.length === 0
  if (isCartEmpty) return <EmptyCart />

  return (
    <div>
      <CartItems cartItems={cartItems} />
      <OrderSummary orderSummary={orderSummary} />
    </div>
  )
}

function EmptyCart() {
  return (
    <div>
      Your cart is empty
      <Link to={'/shop'}>Shop Now</Link>
    </div>
  )
}

function CartItems({ cartItems }) {
  return (
    <ul>
      {cartItems.map(ci => {
        return (
          <CartItem ci={ci} key={ci.item.id} />
        )
      })}
    </ul>
  )
}

function CartItem({ ci }) {
  const submit = useSubmit()

  return (
    <li>
      <Link to={`/shop/${ci.item.id}`}>
        <div>
          <img src={ci.item.image} alt={ci.item.name + ' image'} />
        </div>
      </Link>
      <p>ID: {ci.item.id}</p>
      <p>{ci.item.name}</p>
      <p>{ci.item.description}</p>
      <p>{ci.item.buyCost} Gold</p>
      <Form method='post'>
        <p>
          <button 
            type='submit'
            name='button'
            value='decrement'
          >-</button>
          <input
            name='qty'
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                submit(e.currentTarget.form)
              }
            }}
            value={ci.qty}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
          />
          <input 
            type="hidden"
            name='itemId'
            value={ci.item.id}
          />
          <input 
            type="hidden"
            name='action'
            value='edit'
          />
          <button 
            type='submit'
            name='button'
            value='increment'
          >+</button>
        </p>
      </Form>
      <p>Total: {ci.qty * ci.item.buyCost} Gold</p>
      <Form method='post'>
        <button 
          type='submit'
          name='itemId'
          value={ci.item.id}
        >🗑️</button>
        <input 
          type="hidden"
          name='action'
          value='delete'
        />
      </Form>
    </li>
  )
}

function OrderSummary({ orderSummary }) {
  const {subtotal, totalQty, vat, total} = orderSummary

  return (
    <div>
      <h2>Order Summary</h2>
      <h3>{total}</h3>
      <p>
        <span>Subtotal {totalQty} {totalQty > 1 ? 'items' : 'item'}</span>
        <span>{subtotal} Gold</span>
      </p>
      <p>
        <span>VAT (12%)</span>
        <span>{vat} Gold</span>
      </p>
      <hr />
      <p>
        <span>Total</span>
        <span>{total} Gold</span>
      </p>
      <button>Checkout</button>
      <Link to={'/shop'}>Continue Shopping</Link>
    </div>
  )
}

export default Cart