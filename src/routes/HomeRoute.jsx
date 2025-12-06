import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <p>Welcome to Summoner's Shop</p>
      <p>Insert description here...</p>
      <Link to={'/shop'} aria-label="shop now">Shop Now</Link>
    </div>
  )
}

export default Home