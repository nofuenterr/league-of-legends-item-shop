import itemClass from '../../items';

export async function action({ request }) {
  const formData = await request.formData()
  const tag = formData.get('tag')
  return itemClass.setTagFilter(tag)
}
