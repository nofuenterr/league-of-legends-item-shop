import { Link, useOutletContext } from "react-router-dom"
import styles from './HomeRoute.module.css'
import Items from "../shop_route/Items"
import items from "../../data/items/items"
import LoadingItems from '../../components/results/Results';

function Home() {
  const { data, error, loading } = useOutletContext()

  return (
    <div>
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

      {error
        ? (
          <>{error}</> 
        )
        : loading
          ? (
            <LoadingItems
              mainHeading='Loading...'
              mainParagraph='Noxian supply lines are moving your gear through the front.'
            >
            </LoadingItems>
          )
          : data
            ? <FeaturedItems />
            : null
      }
    </div>
  )
}

function FeaturedItems() {
  const itemsList = items.getItems('').slice(0, 32)

  return (
    <Items items={itemsList} />
  )
}

export default Home