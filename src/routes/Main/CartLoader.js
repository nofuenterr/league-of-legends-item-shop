import itemClass from '../../items';

export async function loader() {
  const cartItems = itemClass.getCart()
  const [subtotal, totalQty, vat, total] = itemClass.getOrderSummary()
  return [subtotal, totalQty, vat, total, cartItems]
}
