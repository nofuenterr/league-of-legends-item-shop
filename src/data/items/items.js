import addDiscountAndStock from "../../util/addDiscountAndStock";
import tags from "./tags";
import sort, { 
  sortItems 
} from "./sort";
import filter, { 
  filterItemsByQuery, 
  filterItemsByTags, 
  filterItemsByPrice 
}  from "./filter";

class Items {
  constructor() {
    this.itemsList = null
  }

  setItems(items) {
    this.itemsList = addDiscountAndStock(items)
    console.log(`[App] Added ${items.length} items`)
    tags.setTags(items)
  }

  getItems() {
    const sortBy = sort.getSort()
    const query = filter.getQuery()
    const tags = filter.getTags()
    const [min, max] = filter.getPrice()
    let items = [...this.itemsList]

    items = sortItems(items, sortBy)
    if (query) items = filterItemsByQuery(items, query)
    if (tags.length > 0) items = filterItemsByTags(items, tags)
    if (min || max) items = filterItemsByPrice(items, min, max)

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
}

export default new Items()
