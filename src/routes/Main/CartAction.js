import itemClass from '../../items';

export async function action({ request }) {
  const formData = await request.formData()
  const itemId = formData.get('itemId')
  const action = formData.get('action');

  if (action === 'edit') {
    let qty = +formData.get('qty')
    const button = formData.get('button')
    if (button) {
      if (button === 'increment') qty += 1
      if (button === 'decrement' && qty > 1) qty -= 1
    }
    return itemClass.setCartItem(itemId, qty)
  }

  if (action === 'delete') {
    return itemClass.removeFromCart(itemId)
  }
}
