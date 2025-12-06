import { useLoaderData, Link, Form, useSubmit } from 'react-router-dom'

function CartRoute() {
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
      <Link to={'/shop'} aria-label='shop now'>Shop Now</Link>
    </div>
  )
}

function CartItems({ cartItems }) {
  return (
    <ul>
      {cartItems.map(item => {
        return (
          <CartItem item={item} key={item.id} />
        )
      })}
    </ul>
  )
}

function CartItem({ item }) {
  const submit = useSubmit()

  return (
    <li title={item.name + ': ' + item.qty * item.buyCost + ' total gold'}>
      {!item.stock && <p>Sold Out</p>}
      <Link to={`/shop/${item.id}`}>
        <div>
          <img src={item.image} alt={item.name + ' image'} />
        </div>
      </Link>
      <p>ID: {item.id}</p>
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.buyCost} Gold</p>
      <p>Stock: {item.stock}</p>
      <Form method='post'>
        <p>
          <button 
            type='submit'
            name='button'
            value='decrement'
            aria-label='decrement'
          >-</button>
          <input
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
            type='submit'
            name='button'
            value='increment'
            aria-label='increment'
          >+</button>
        </p>
      </Form>
      <p>Total: {item.qty * item.buyCost} Gold</p>
      <Form method='post'>
        <button 
          type='submit'
          name='itemId'
          value={item.id}
          aria-label='remove from cart'
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
      <button aria-label='checkout'>Checkout</button>
      <Link to={'/shop'} aria-label='continue shopping'>Continue Shopping</Link>
    </div>
  )
}

export default CartRoute