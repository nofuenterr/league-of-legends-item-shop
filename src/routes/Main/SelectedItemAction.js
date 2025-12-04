import itemClass from '../../items';
import { redirect } from 'react-router-dom';

export async function action({ request, params }) {
  const formData = await request.formData()
  const quantity = +formData.get('qty')
  const intent = formData.get('intent');

  if (intent === 'add') {
    return itemClass.addToCart(params.itemId, quantity)
  }

  if (intent === 'buy') {
    itemClass.addToCart(params.itemId, quantity)
    return redirect('/cart');
  }
}
