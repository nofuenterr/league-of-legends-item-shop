import { NavLink } from 'react-router-dom'

function Header({ totalQty, children }) {

  return (
    <header>
      <nav>
        <h1><NavLink to='/' title="Summoner's Shop">Summoner's Shop</NavLink></h1>
        <ul>
          <li><NavLink to='/' aria-label='home'>Home</NavLink></li>
          <li><NavLink to='/shop' aria-label='shop'>Shop</NavLink></li>
        </ul>
        {children}
        <ul>
          <li><NavLink to='/shop' aria-label='favorites'>❤{/* temporary icon */}</NavLink></li>
          <li><NavLink to='/cart' aria-label='cart'>🛒{/* temporary icon */}{totalQty}</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header