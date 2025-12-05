import splitPascalCase from "./util/split-pascal-case";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import addDiscountAndStock from "./util/add-discount-and-stock";

class Items {
  constructor() {
    this.itemsList = null
    this.tags = []
    this.sort = 'default'
    this.queryFilter = ''
    this.tagFilter = []
    this.priceFilter = [null, null]
    this.cart = []
  }

  /* Items */

  setItems(items) {
    this.itemsList = addDiscountAndStock(items)
    console.log(`[App] Added ${items.length} items`)
    this.setTags(items)
  }

  getItems() {
    const sort = this.getSort()
    const query = this.getQuery()
    const tagFilter = this.getTagFilter()
    const [min, max] = this.getPriceFilter()
    let items = [...this.itemsList]

    items = this.sortItems(items, sort)
    if (query) items = this.filterItemsByQuery(items, query)
    if (tagFilter.length > 0) items = this.filterItemsByTags(items, tagFilter)
    if (min || max) items = this.filterItemsByPrice(items, min, max)

    console.log(`[Shop] Retrieved ${items.length} items`)
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

  /* Filter and Sort Systems */

  sortItems(items, sort) {
    switch(sort) {
      case 'a-z':
        console.log(`[Sort] Alphabetically: A-Z`)
        return items.sort(sortBy("name", "id"))
      case 'z-a':
        console.log(`[Sort] Alphabetically: Z-A`)
        return items.sort(sortBy("name", "id")).reverse()
      case 'low-high':
        console.log(`[Sort] Price: Low to High`)
        return items.sort(sortBy("buyCost", "id"))
      case 'high-low':
        console.log(`[Sort] Price: High to Low`)
        return items.sort(sortBy("buyCost", "id")).reverse()
      default:
        console.log(`[Sort] Default`)
        return items
    }
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
  
  /* Filter and Sort */

  setSort(sort = 'default') {
    this.sort = sort
  }

  getSort() {
    return this.sort
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

  /* Cart */

  addToCart(id, qty) {
    const item = this.getItem(id)
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
    const item = this.getItem(id)
    item.qty = 0
    console.log(
      `[Cart] Removed ${item.name}`
    )
  }

  getCart() {
    return [...this.cart]
  }

  getTotalQuantity() {
    return this.cart.reduce((totalQty, item) => {
      return totalQty += item.qty
    }, 0)
  }

  getOrderSummary() {
    const cart = this.getCart()
    let totalQty = 0
    let subtotal = 0
    cart.forEach(item => {
      subtotal += (item.buyCost * item.qty)
      totalQty += item.qty
    })
    const vat = parseFloat((subtotal * 0.12).toFixed(2))
    const total = parseFloat((subtotal + vat).toFixed(2))
    subtotal = parseFloat(subtotal.toFixed(2))
    console.log(`[Order Summary] Total: ${total}`)
    return {subtotal, totalQty, vat, total}
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

export default new Items()
