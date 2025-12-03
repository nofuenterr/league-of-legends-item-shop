import { Link } from "react-router-dom"

function Item({ item }) {
  return (
    <li>
      <Link to={`/shop/${item.id}`}>
        <div>
          <img src={item.image} alt={item.name + ' image'} />
        </div>
        <p>ID: {item.id}</p>
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>{item.buyCost} Gold</p>
      </Link>
    </li>
  )
}

export default Item
