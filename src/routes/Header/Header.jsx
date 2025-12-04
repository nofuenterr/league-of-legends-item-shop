import { NavLink } from 'react-router-dom'

function Header({ totalQty, children }) {

  return (
    <header>
      <nav>
        <h1><NavLink to='/'>Summoner's Shop</NavLink></h1>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/shop'>Shop</NavLink></li>
        </ul>
        {children}
        <ul>
          <li><NavLink to='/shop'>❤{/* temporary icon */}</NavLink></li>
          <li><NavLink to='/cart'>🛒{/* temporary icon */}{totalQty}</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header