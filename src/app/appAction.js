import { redirect } from "react-router-dom";
import filter from "../data/items/filter";

export async function action({ request }) {
  const formData = await request.formData()
  const removeSearach = formData.get('removeSearch')
  const query = formData.get('search')
  
  if (removeSearach) {
    filter.setQuery('')
  } else {
    filter.setQuery(query)
  }
  return redirect('/shop')
}
