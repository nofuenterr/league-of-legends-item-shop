import { useLoaderData, Link, Form } from 'react-router-dom'

function Cart() {
  const cartItems = useLoaderData()

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
    </>
  )
}

export default Cart