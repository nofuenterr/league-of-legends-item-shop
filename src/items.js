import splitPascalCase from "./util/split-pascal-case";
import { matchSorter } from "match-sorter";

class Items {
  constructor() {
    this.itemsList = null
    this.tags = []
    this.queryFilter = ''
    this.tagFilter = []
    this.priceFilter = [null, null]
    this.cart = []
  }

  setItems(items) {
    this.itemsList = items
    console.log(`[App] Added ${items.length} items`)
    this.setTags(items)
  }

  getItems() {
    const query = this.getQuery()
    const tagFilter = this.getTagFilter()
    const [min, max] = this.getPriceFilter()
    let items = [...this.itemsList]

    if (query) items = this.filterItemsByQuery(items, query)
    if (tagFilter.length > 0) items = this.filterItemsByTags(items, tagFilter)
    if (min || max) items = this.filterItemsByPrice(items, min, max)
      
    console.log(`[Shop] Retrieved ${items.length} items`)
    return items
  }

  filterItemsByQuery(items, query) {
    console.log(`[Filter - Query] "${query}"`)
    return matchSorter(items, query, { keys: ["name"] });
  }

  filterItemsByTags(items, tagFilter) {
    return items.filter(item => {
      let matchedTags = 0
      item.tags.forEach(t => {
        const tag = splitPascalCase(t)
        if (tagFilter.includes(tag)) matchedTags += 1
      })
      const doesItemSatisfyTagFilter = matchedTags === tagFilter.length
      if (doesItemSatisfyTagFilter) return true
      return false
    })
  }

  filterItemsByPrice(items, min, max) {
    return items.filter(item => {
      let filtered = true
      switch(true) {
        case !!(min && max):
          if (item.buyCost >= min && item.buyCost <= max) filtered = false
          break;
        case !!min:
          if (item.buyCost >= min) filtered = false
          break;
        case !!max:
          if (item.buyCost <= max) filtered = false
          break;
        default:
          filtered = false
      }
      if (filtered) {
        return false
      }
      return true
    })
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

  setTags(items) {
    const tags = []
    items.forEach(item => {
      item.tags.forEach(t => {
        const tag = splitPascalCase(t)
        if (!tags.includes(tag)) tags.push(tag)
      })
    })
    this.tags = tags
    console.log(`[App] Added ${tags.length} tags`)
  }

  getTags() {
    return [...this.tags]
  }

  setQuery(query = '') {
    this.queryFilter = query
  }

  getQuery() {
    return this.queryFilter
  }

  setTagFilter(tag) {
    if (tag) {
      const isTagOnFilter = this.tagFilter.find(t => t === tag)
      if (isTagOnFilter) {
        this.tagFilter = this.tagFilter.filter(t => t !== tag)
        console.log(`[Filter - Tag] Removed ${tag}`)
      } else {
        this.tagFilter.push(tag)
        console.log(`[Filter - Tag] Added ${tag}`)
      }
    }
  }

  getTagFilter() {
    return [...this.tagFilter]
  }

  setPriceFilter(min, max) {
    if (!min) min = null
    if (!max) max = null
    this.priceFilter = [min, max]
    if (min && max) {
      console.log(`[Filter - Price] Min: ${min} gold - Max: ${max} gold`)
    } else {
      if (min) console.log(`[Filter - Price] Min: ${min} gold`)
      if (max) console.log(`[Filter - Price] Max: ${max} gold`)
    }
  }

  getPriceFilter() {
    return [...this.priceFilter]
  }

  addToCart(id, qty) {
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id)
    const isItemInCart = index >= 0
    if (isItemInCart) {
      const itemName = this.cart[index].item.name
      const prevQty = this.cart[index].qty
      this.cart[index].qty += qty
      const newQty = this.cart[index].qty
      console.log(
        `[Cart] Updated ${itemName}: ${prevQty} → ${newQty} (added ${qty}x)`
      )
    } else {
      const item = this.getItem(id)
      this.cart.push({ item, qty })
      console.log(
        `[Cart] Added ${item.name}: ${qty}`
      )
    }
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(cartItem => cartItem.item.id !== id)
    const item = this.getItem(id)
    console.log(
      `[Cart] Removed ${item.name}`
    )
  }

  getCart() {
    return [...this.cart]
  }

  getTotalQuantity() {
    return this.cart.reduce((totalQty, currCartItem) => {
      return totalQty += currCartItem.qty
    }, 0)
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
    console.log(`[Order Summary] Total: ${total}`)
    return {subtotal, totalQty, vat, total}
  }

  getCartItemIndex(id) {
    const index = this.cart.findIndex(cartItem => cartItem.item.id === id)
    const isItemInCart = index >= 0
    if (!isItemInCart) {
      throw new Response('', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return index
  }

  setCartItem(id, qty) {
    const index = this.getCartItemIndex(id)
    const itemName = this.cart[index].item.name
    const prevQty = this.cart[index].qty
    this.cart[index].qty = qty
    const newQty = this.cart[index].qty
    const qtyDifference = Math.abs(newQty - prevQty)
    const operation = newQty > prevQty ? 'added' : 'subtracted'
    console.log(
      `[Cart] Updated ${itemName}: ${prevQty} → ${newQty} (${operation} ${qtyDifference}x)`
    )
  }
}

export default new Items()
