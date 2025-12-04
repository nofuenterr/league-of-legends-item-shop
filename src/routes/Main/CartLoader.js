import itemClass from '../../items';

export async function loader() {
  const cartItems = itemClass.getCart()
  const orderSummary = itemClass.getOrderSummary()
  return [orderSummary, cartItems]
}
