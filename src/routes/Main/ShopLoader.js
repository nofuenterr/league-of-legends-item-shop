import itemClass from '../../items';

export async function loader() {
  const sort = itemClass.getSort()
  const tagFilter = itemClass.getTagFilter()
  const [minPrice, maxPrice] = itemClass.getPriceFilter()
  return { sort, tagFilter, minPrice, maxPrice }
}
