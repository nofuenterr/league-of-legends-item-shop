import itemsClass from "../../items";
import { useNavigate, useParams, useOutletContext } from "react-router-dom"

function SelectedItem() {
  const [data, error, loading ] = useOutletContext()
  const params = useParams()
  const navigate = useNavigate()

  if (error) return <>{error}</>
  if (loading) return <>{'Loading...'}</>
  if (data) {
    const item = itemsClass.getItem(params.itemId)
    return (
      <>
        <div>
          <button type="button" onClick={() => navigate(-1)}>Back</button>
          <div>
            <img src={item.image} alt={item.name + ' image'} />
          </div>
          <p>ID: {item.id}</p>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.buyCost} Gold</p>
        </div>
      </>
    )
  }
}

export default SelectedItem
