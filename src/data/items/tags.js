import splitPascalCase from "../../util/splitPascalCase"

class Tags {
  constructor() {
    this.tags = []
  }

  getTags() {
    return [...this.tags]
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
}

export default new Tags()
