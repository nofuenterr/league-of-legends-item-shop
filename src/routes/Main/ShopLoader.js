import itemClass from '../../items';

export async function loader() {
  const tagFilter = itemClass.getTagFilter()
  const [minPrice, maxPrice] = itemClass.getPriceFilter()
  return { tagFilter, minPrice, maxPrice }
}
