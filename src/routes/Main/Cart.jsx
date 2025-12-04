import { useLoaderData, Link, Form } from 'react-router-dom'

function Cart() {
  const [subtotal, totalQty, vat, total, cartItems] = useLoaderData()

  if (cartItems.length === 0) return <>No items in cart...</>
  return (
    <>
      <ul>
        {cartItems.map(ci => {
          return (
            <li key={ci.item.id}>
              <Link to={`/shop/${ci.item.id}`}>
                <div>
                  <img src={ci.item.image} alt={ci.item.name + ' image'} />
                </div>
              </Link>
              <p>ID: {ci.item.id}</p>
              <p>{ci.item.name}</p>
              <p>{ci.item.description}</p>
              <p>{ci.item.buyCost} Gold</p>
              <p>Qty: {ci.qty}</p>
              <p>Total: {ci.qty * ci.item.buyCost} Gold</p>
              <Form method='post'>
                <button 
                  type='submit'
                  name='itemId'
                  value={ci.item.id}
                >🗑️</button>
              </Form>
            </li>
          )
        })}
      </ul>
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
      </div>
    </>
  )
}

export default Cart