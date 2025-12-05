import { redirect } from "react-router-dom";
import itemClass from "../../items";

export async function action({ request }) {
  const formData = await request.formData()
  const query = formData.get('search')
  itemClass.setQuery(query)
  return redirect('/shop')
}
