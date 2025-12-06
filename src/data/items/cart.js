import items from "./items"

class Cart {
  constructor() {
    this.cart = []
  }

  getCart() {
    return [...this.cart]
  }

  addToCart(id, qty) {
    const item = items.getItem(id)
    const isItemInCart = item.qty > 0

    if (isItemInCart) {
      const prevQty = item.qty
      item.qty += qty
      const newQty = item.qty
      console.log(
        `[Cart] Updated ${item.name}: ${prevQty} → ${newQty} (added ${qty}x)`
      )
    } else {
      item.qty = qty
      this.cart.push(item)
      console.log(
        `[Cart] Added ${item.name}: ${qty}`
      )
    }
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id)
    const item = items.getItem(id)
    item.qty = 0
    console.log(
      `[Cart] Removed ${item.name}`
    )
  }

  getCartItem(id) {
    const item = this.cart.find(item => item.id === id)
    const isItemInCart = item
    if (!isItemInCart) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return item
  }

  setCartItem(id, qty = 1) {
    const item = this.getCartItem(id)
    const prevQty = item.qty
    item.qty = qty
    const newQty = item.qty
    const qtyDifference = Math.abs(newQty - prevQty)
    const operation = newQty > prevQty ? 'added' : 'subtracted'
    console.log(
      `[Cart] Updated ${item.name}: ${prevQty} → ${newQty} (${operation} ${qtyDifference}x)`
    )
  }
}

const cart = new Cart()

export const getOrderSummary = () => {
  const cartItems = cart.getCart()
  let totalQty = 0
  let subtotal = 0
  cartItems.forEach(item => {
    subtotal += (item.buyCost * item.qty)
    totalQty += item.qty
  })
  const vat = parseFloat((subtotal * 0.12).toFixed(2))
  const total = parseFloat((subtotal + vat).toFixed(2))
  subtotal = parseFloat(subtotal.toFixed(2))
  console.log(`[Order Summary] Total: ${total}`)
  return {subtotal, totalQty, vat, total}
}

export const getTotalQuantity = () => {
  const cartItems = cart.getCart()
  return cartItems.reduce((totalQty, item) => {
    return totalQty += item.qty
  }, 0)
}

export default new Cart()
