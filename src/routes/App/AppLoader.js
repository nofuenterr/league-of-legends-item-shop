import itemClass from "../../items";

export async function loader() {
  const query = itemClass.getQuery()
  const totalQty = itemClass.getTotalQuantity()
  return { query, totalQty }
}
