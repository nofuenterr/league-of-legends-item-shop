import filter from "../data/items/filter";
import cart, { getTotalQuantity } from "../data/items/cart";

export async function loader() {
  const query = filter.getQuery()
  const cartItems = cart.getCart()
  const totalQty = getTotalQuantity(cartItems)
  return { query, totalQty }
}
