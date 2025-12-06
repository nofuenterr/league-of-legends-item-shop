import cart from '../../data/items/cart';

export async function action({ request }) {
  const formData = await request.formData()
  const itemId = formData.get('itemId')
  const action = formData.get('action');

  let qty = parseInt(formData.get('qty'))
  let stock = parseInt(formData.get('stock'))
  const button = formData.get('button')
  if (button) {
    if (button === 'increment') qty += 1
    if (button === 'decrement') qty -= 1
  }

  if (action === 'edit' && qty) {
    if (qty <= stock) {
      return cart.setCartItem(itemId, qty)
    } else {
      alert(`Sorry, you can only buy max ${stock} in one checkout`)
    }
  }

  if (action === 'delete') {
    return cart.removeFromCart(itemId)
  }
}
