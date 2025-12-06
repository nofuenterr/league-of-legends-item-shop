import sortBy from "sort-by";

class Sort {
  constructor() {
    this.sort = 'default'
  }

  getSort() {
    return this.sort
  }

  setSort(sort = 'default') {
    this.sort = sort
  }
}

export const sortItems = (items, sort) => {
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

export default new Sort()
