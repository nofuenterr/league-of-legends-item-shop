import itemClass from '../../items';

export async function action({ request }) {
  const formData = await request.formData()
  const itemId = formData.get('itemId')
  
  return itemClass.removeFromCart(itemId)
}
