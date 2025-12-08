import styles from './ShopRoute.module.css'
import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import Items from './Items';
import BreadcrumbsControls from './BreadcrumbsControls';
import items from '../../data/items/items';
import BreadcrumbsControlsIcon from '../../../public/Settings2'
import parsePrice from '../../util/parsePrice';

export default function ShopRoute() {
  const { data, error, loading } = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) return <Shop />
}

function Shop() {
  const itemsList = items.getItems()

  return (
    <div>
      <BreadcrumbsBar items={itemsList} />
      <Items items={itemsList} />
    </div>
  )
}

function BreadcrumbsBar({ items }) {
  const [controls, setControls] = useState(false)

  return (
    <div className={styles.breadcrumbsWrapper}>
      <BreadcrumbsList items={items} />

      <button
        aria-haspopup='dialog'
        aria-expanded={controls}
        aria-controls='breadcrumbsControlButton'
        className={styles.breadcrumbsControlsButton} 
        onClick={() => setControls(prev => !prev)}
      >
        <BreadcrumbsControlsIcon size={20} />
        Refine
      </button>

      <BreadcrumbsControls 
        controls={controls}
        setControls={setControls}
      />
    </div>
  )
}

function BreadcrumbsList({ items }) {
  const { query } = useOutletContext()

  return (
    <div>
      <nav>
        <ol className={styles.breadcrumbsList}>
          <li>
            <Link to='/'>Home</Link> /
          </li>
          <li>
            <p aria-live='polite' aria-label={items.length + ' items'}>
              <span className={styles.breadcrumbsCurrent}>
                {query ? `Search - '${query}' ` : 'Shop '}
              </span>
              <sup>
                <span className={styles.shopItemsQuantity}>
                  ({parsePrice(items.length)})
                </span>
              </sup>
            </p>
          </li>
        </ol>
      </nav>
    </div>
  )
}
