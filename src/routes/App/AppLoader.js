import itemClass from "../../items";

export async function loader() {
  const totalQty = itemClass.getTotalQuantity()
  return totalQty
}
