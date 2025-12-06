import { redirect } from "react-router-dom";
import filter from "../data/items/filter";

export async function action({ request }) {
  const formData = await request.formData()
  const query = formData.get('search')
  filter.setQuery(query)
  return redirect('/shop')
}
