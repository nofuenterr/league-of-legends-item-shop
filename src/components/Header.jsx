import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import lolIconFlatWhite from '../assets/images/LoL_Icon_Flat_WHITE.png'
import ShoppingCart from './icons/ShoppingCart'

function Header({ totalQty, children }) {

  return (
    <header className={`${styles.header}`}>
      <nav className={styles.nav}>
        <div className={styles.navWrapper}>
          <NavLink to='/' title="Summoner's Shop">
            <div className={styles.brand}>
              <div className={styles.brandImage}>
                <img src={lolIconFlatWhite} alt="LoL icon" />
              </div>
              <div>
                <p>Summoner's</p>
                <p>Shop</p>
              </div>
            </div>
          </NavLink>
          <div className={styles.navWrapperCenter}>
            <ul className={styles.navLinkList}>
              <li><NavLink to='/' aria-label='home'>Home</NavLink></li>
              <li><NavLink to='/shop' aria-label='shop'>Shop</NavLink></li>
              <li><NavLink to='/sale' aria-label='sale'>Sale</NavLink></li>
            </ul>
            {children}
          </div>
          <div>
            <NavLink to='/cart' aria-label='cart' className={styles.cartWrapper}>
              <ShoppingCart />
              <div className={styles.cartQuantity}>
                {totalQty}
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header