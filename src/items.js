import splitPascalCase from "./util/split-pascal-case";
import { matchSorter } from "match-sorter";

class Items {
  constructor() {
    this.itemsList = null
    this.tags = []
    this.tagFilter = []
    this.cart = []
  }


  setItems(items) {
    this.itemsList = items
    const tags = []
    items.forEach(item => {
      item.tags.forEach(t => {
        const tag = splitPascalCase(t)
        if (!tags.includes(tag)) tags.push(tag)
      })
    })
    this.tags = tags
  }

  getItems(query) {
    const tagFilter = this.getTagFilter()
    let items = [...this.itemsList]
    if (query) {
      items = matchSorter(items, query, { keys: ["name"] });
    }
    if (tagFilter.length > 0) {
      items = items.filter(item => {
        let matchedTags = 0
        item.tags.forEach(t => {
          const tag = splitPascalCase(t)
          if (tagFilter.includes(tag)) {
            matchedTags += 1
          }
        })
        if (matchedTags === tagFilter.length) {
          return true;
        }
        return false
      })
    }
    console.log(items)
    return items
  }
  
  getItem(id) {
    const item = this.itemsList.find(item => item.id === id)
    if (!item) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return item
  }

  getTags() {
    return [...this.tags]
  }

  setTagFilter(tag) {
    const isTagOnFilter = this.tagFilter.find(t => t === tag)
    isTagOnFilter
      ? this.tagFilter = this.tagFilter.filter(t => t !== tag)
      : this.tagFilter.push(tag)
  }

  getTagFilter() {
    return [...this.tagFilter]
  }

  addToCart(id, qty) {
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id)
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

  getCartItemIndex(id) {
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id)
    if (index < 0) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return index
  }

  setCartItem(id, qty) {
    const index = this.getCartItemIndex(id)
    this.cart[index].qty = qty
    console.log(this.cart[index])
  }
}

export default new Items()
