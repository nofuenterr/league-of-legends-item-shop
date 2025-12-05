import itemClass from '../../items';

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
      return itemClass.setCartItem(itemId, qty)
    } else {
      alert(`Sorry, you can only buy max ${stock} in one checkout`)
    }
  }

  if (action === 'delete') {
    return itemClass.removeFromCart(itemId)
  }
}
