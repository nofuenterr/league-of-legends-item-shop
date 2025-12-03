class Items {
  constructor() {
    this.itemsList = null
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
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return item
  }
}

export default new Items()
