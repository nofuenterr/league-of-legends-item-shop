import itemClass from '../../items';

export async function loader() {
  const cartItems = itemClass.getCart()
  return cartItems
}
