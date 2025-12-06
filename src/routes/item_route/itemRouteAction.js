import cart from '../../data/items/cart';
import { redirect } from 'react-router-dom';

export async function action({ request, params }) {
  const formData = await request.formData()
  const quantity = parseInt(formData.get('qty'))
  const addToCart = formData.get('addToCart');

  if (addToCart) {
    const available = formData.get('available');
    const cartQty = formData.get('cartQty');
    if (available === 'true') {
      cart.addToCart(params.itemId, quantity)
      const buy = formData.get('buy');
      if (buy) return redirect('/cart');
    } else {
      alert(`You already have ${cartQty} quantity in cart. Unable to add selected quantity to cart as it would exceed your purchase limit.`)
    }
  }
}
