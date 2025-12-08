import splitPascalCase from "../../util/splitPascalCase"
import { matchSorter } from "match-sorter";

class Filter {
  constructor() {
    this.query = ''
    this.tags = []
    this.price = [null, null]
  }

  setQuery(query = '') {
    this.query = query
  }

  getQuery() {
    return this.query
  }

  setTags(tag) {
    if (tag) {
      const isTagOnFilter = this.tags.find(t => t === tag)
      if (isTagOnFilter) {
        this.tags = this.tags.filter(t => t !== tag)
        console.log(`[Filter - Tag] Removed ${tag}`)
      } else {
        this.tags.push(tag)
        console.log(`[Filter - Tag] Added ${tag}`)
      }
    }
  }

  getTags() {
    return [...this.tags]
  }

  setPrice(min, max) {
    if (!min) min = null
    if (!max) max = null
    this.price = [min, max]
    if (min && max) {
      console.log(`[Filter - Price] Min: ${min} gold - Max: ${max} gold`)
    } else {
      if (min) console.log(`[Filter - Price] Min: ${min} gold`)
      if (max) console.log(`[Filter - Price] Max: ${max} gold`)
    }
  }

  getPrice() {
    return [...this.price]
  }

  clearFilters() {
    this.tags = []
    this.price = [null, null]
  }
}

export const filterItemsByPrice = (items, min, max) => {
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

export const filterItemsByQuery = (items, query) => {
  console.log(`[Filter - Query] "${query}"`)
  return matchSorter(items, query, { keys: ["name"] });
}

export const filterItemsByTags = (items, tagFilter) => {
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

export default new Filter()
