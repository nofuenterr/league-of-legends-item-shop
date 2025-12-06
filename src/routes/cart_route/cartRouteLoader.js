import cart, { 
  getOrderSummary 
} from "../../data/items/cart"

export async function loader() {
  const cartItems = cart.getCart()
  const orderSummary = getOrderSummary(cartItems)
  return [orderSummary, cartItems]
}
