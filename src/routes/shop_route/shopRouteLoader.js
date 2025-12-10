import sort from '../../data/items/sort';
import filter from '../../data/items/filter';

export async function loader() {
  const sortBy = sort.getSort()
  const tagFilter = filter.getTags()
  const availability = filter.getAvailability()
  const filters = filter.getFilters()
  const [minPrice, maxPrice] = filter.getPrice()
  return { sortBy, tagFilter, availability, filters, minPrice, maxPrice }
}
