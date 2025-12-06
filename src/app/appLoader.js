import filter from "../data/items/filter";
import { getTotalQuantity } from "../data/items/cart";

export async function loader() {
  const query = filter.getQuery()
  const totalQty = getTotalQuantity()
  return { query, totalQty }
}
