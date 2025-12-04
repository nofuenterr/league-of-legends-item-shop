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

  getCart() {
    return [...this.cart]
  }

  getTotalQuantity() {
    const totalQty = this.cart.reduce((totalQty, currCartItem) => {
      return totalQty += currCartItem.qty
    }, 0)
    return totalQty
  }
}

export default new Items()
