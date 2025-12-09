import { Link } from "react-router-dom"
import styles from './HomeRoute.module.css'

function Home() {
  return (
    <div className={styles.heroWrapper}>
      <h1 className={styles.heroHeading}>
        <span>Summoner's</span>
        <span>Shop</span>
      </h1>
      <h2 className={styles.heroSubHeading}>Summoner’s Shop offers a collection of iconic League of Legends items presented as unique products. Build your dream loadout, explore item stats, and experience the Rift like never before.</h2>
      <div className={styles.shopNowWrapper}>
        <Link className={styles.shopNow} to={'/shop'} aria-label="shop now" role="button">Shop Now</Link>
      </div>
    </div>
  )
}

export default Home