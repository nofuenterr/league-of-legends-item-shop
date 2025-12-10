
import styles from './BreadcrumbsBar.module.css'
import { useState } from 'react';
import { useOutletContext, Link, useLocation } from 'react-router-dom';
import BreadcrumbsControls from './BreadcrumbsControls';
import BreadcrumbsControlsIcon from '../icons/Settings2'
import formatPrice from '../../util/formatPrice';
import formatPathname from '../../util/formatPathname';

export default function BreadcrumbsBar({ items }) {
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
  const { pathname } = useLocation()

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
                {query ? `Search - '${query}' ` : `${formatPathname(pathname)} `}
              </span>
              <sup>
                <span className={styles.shopItemsQuantity}>
                  ({formatPrice(items.length)})
                </span>
              </sup>
            </p>
          </li>
        </ol>
      </nav>
    </div>
  )
}