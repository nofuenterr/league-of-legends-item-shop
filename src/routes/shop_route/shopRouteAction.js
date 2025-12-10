import sort from '../../data/items/sort';
import filter from '../../data/items/filter';

export async function action({ request }) {
  const formData = await request.formData()
  const sortBy = formData.get('sortBy')
  const removeQuery = formData.get('removeQuery')
  const tag = formData.get('tag')
  const availability = formData.get('availability')
  const priceFilter = formData.get('priceFilter')
  const clearFilters = formData.get('clearFilters')

  if (sortBy) sort.setSort(sortBy)
  if (removeQuery) filter.setQuery('')
  if (tag) filter.setTags(tag)
  if (availability) filter.setAvailability(availability)
  if (priceFilter) {
    const minPrice = parseInt(formData.get('minPrice'))
    const maxPrice = parseInt(formData.get('maxPrice'))
    filter.setPrice(minPrice, maxPrice)
  }
  if (clearFilters) {
    filter.clearFilters()
  }
}
