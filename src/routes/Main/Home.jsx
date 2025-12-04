import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      Currently at Home
      <Link to={'/shop'}>Shop Now</Link>
    </>
  )
}

export default Home