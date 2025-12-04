class Items {
  constructor() {
    this.itemsList = null
    this.cart = []
  }


  setItems(items) {
    this.itemsList = items
  }

  getItems() {
    return [...this.itemsList]
  }
  
  getItem(id) {
    const item = this.itemsList.find(item => id === item.id)
    if (!item) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return item
  }

  addToCart(id, qty) {
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id)
    console.log(index)
    if (index >= 0) {
      this.cart[index].qty += qty
    } else {
      const item = this.getItem(id)
      this.cart.push({ item, qty })
    }
    console.log(this.cart)
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(cartItem => cartItem.item.id !== id)
    console.log(this.cart)
  }

  getCart() {
    return [...this.cart]
  }

  getTotalQuantity() {
    const totalQty = this.cart.reduce((totalQty, currCartItem) => {
      return totalQty += currCartItem.qty
    }, 0)
    return totalQty
  }

  getOrderSummary() {
    const cart = this.getCart()
    let totalQty = 0
    let subtotal = 0
    cart.forEach(currCartItem => {
      subtotal += (currCartItem.item.buyCost * currCartItem.qty)
      totalQty += currCartItem.qty
    })
    const vat = subtotal * 0.12
    const total = subtotal + vat
    return [subtotal, totalQty, vat, total]
  }
}

export default new Items()
