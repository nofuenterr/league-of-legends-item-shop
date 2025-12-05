import itemClass from '../../items';

export async function action({ request }) {
  const formData = await request.formData()
  const removeQuery = formData.get('removeQuery')
  const tag = formData.get('tag')
  const priceFilter = formData.get('priceFilter')
  
  if (removeQuery) itemClass.setQuery('')
  if (tag) itemClass.setTagFilter(tag)
  if (priceFilter) {
    const minPrice = +formData.get('minPrice')
    const maxPrice = +formData.get('maxPrice')
    itemClass.setPriceFilter(minPrice, maxPrice)
  }
}
