import Loading from '../../components/Loading';
import items from '../../data/items/items';
import tags from '../../data/items/tags';
import { useState, useEffect, useRef } from 'react';
import { Form, useOutletContext, useSubmit, Link, useLoaderData } from 'react-router-dom';
import styles from './ShopRoute.module.css'
import BreadcrumbsControlsIcon from '../../../public/Settings2'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ActiveIndicator from '../../../public/ChevronRight'
import X from '../../../public/X'

function ShopRoute() {
  const { data, error, loading } = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) {
    return (
      <Shop />
    )
  }
}

function Shop() {
  const itemsList = items.getItems()

  return (
    <div>
      <Breadcrumbs items={itemsList} />
      <Items items={itemsList} />
    </div>
  )
}

function Breadcrumbs({ items }) {
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
            <p 
              aria-live='polite' 
              aria-label={items.length + ' items'}
            >
              <span 
                className={styles.breadcrumbsCurrent}
              >{query ? `Search - '${query}' ` : 'Shop '}</span>
              <sup>
                <span 
                  className={styles.shopItemsQuantity}
                >
                  ({items.length})
                </span>
              </sup>
            </p>
          </li>
        </ol>
      </nav>
    </div>
  )
}

function BreadcrumbsControls({ controls, setControls }) {
  const dialogRef = useRef(null);
  const submit = useSubmit()
  const { tagFilter } = useLoaderData()

  useEffect(() => {
    if (controls && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [controls]);

  useEffect(() => {
      document.body.style.overflow = controls ? "hidden" : "";
    }, [controls]);

  useEffect(() => {
    if (!dialogRef.current) return;

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current.querySelectorAll(
        "a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setControls(false);
    };

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setControls]);

  const controlsDialog = {
    initial: {
      x: "100%",
      width: 0,
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
      alignContent: 'start',
    },
    expanded: { 
      x: "0%",
      width: '28rem',
      transition: { duration: 0.35, ease: "easeOut" },
      display: 'grid',
      visibility: 'visible',
      ariaHidden: 'false',
    },
    collapsed: {
      x: "100%",
      width: 0,
      transition: { duration: 0.35, ease: "easeIn" },
      display: 'none',
      visibility: 'hidden',
      ariaHidden: 'true',
    }
  }

  return (
    <>
      {controls && (
        <div
          className={styles.breadcrumbsControlsDialogOverlay}
          aria-hidden="true"
          onClick={() => setControls(false)}
        />
      )}
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        variants={controlsDialog}
        initial={'initial'}
        animate={controls ? "expanded" : "collapsed"}
        role='dialog'
        aria-modal="true"
        aria-describedby='breadcrumbsControlButton'
        className={styles.breadcrumbsControlsDialog} 
      >
        <div className={styles.breadcrumbsControlsDialogHeader}>
          <h2 className={styles.breadcrumbsControlsDialogHeading}>Refine</h2>
          <button
            className={styles.breadcrumbsControlsDialogCloseButton}
            aria-label='close dialog'
            onClick={() => setControls(prev => !prev)}
          >
            Close
            <X size={20} />
          </button>
        </div>
        {tagFilter.length > 0 
          ? (
            <div className={styles.filterTagsWrapper}>
              <div>
                <Form method='post'>
                  <button 
                    name='clearFilters'
                    value={true}
                    onChange={(e) => {
                      submit(e.currentTarget.form)
                    }}
                  >
                    <X size={20}/>
                    <span>Clear Filters</span>
                  </button>
                </Form>
              </div>
              {tagFilter.map(tag => {
                return (
                  <div key={tag}>
                    <Form method='post'>
                      <button 
                        name='tag'
                        value={tag}
                        onChange={(e) => {
                          submit(e.currentTarget.form)
                        }}
                      >
                      <X size={20} />
                      <span>{tag}</span>
                      </button>
                    </Form>
                  </div>
                )
              })}
            </div>
          )
          : null}
        <div className={styles.breadcrumbsControlsDialogContent}>
          <Sort />
          <Price />
          <Tags />
        </div>
      </motion.div>
    </>
  )
}

function Sort() {
  const [activeSort, setActiveSort] = useState(true) 
  const { sortBy } = useLoaderData()
  const submit = useSubmit()

  return (
    <div>
      <h3>
        <button onClick={() => setActiveSort(prev => !prev)} 
          aria-expanded={activeSort}
        >
          <span>Sort By</span>
          <ActiveIndicator size={20} active={activeSort} />
        </button>
      </h3>
      {activeSort && <Form method="post">
        <ul className={styles.sortByList}>
          <li>
            <label>
              <input
                defaultChecked={sortBy === 'default'}
                type="radio"
                name='sortBy'
                value='default'
                onChange={(e) => submit(e.currentTarget.form)}
              />
              Default
            </label>
          </li>
          <li>
            <label>
              <input 
                defaultChecked={sortBy === 'a-z'}
                type="radio" 
                name='sortBy' 
                value='a-z'
                onChange={(e) => submit(e.currentTarget.form)}
              />
              Alphabetically: A-Z
            </label>
          </li>
          <li>
            <label>
              <input
                defaultChecked={sortBy === 'z-a'}
                type="radio"
                name='sortBy'
                value='z-a'
                onChange={(e) => submit(e.currentTarget.form)}
              />
              Alphabetically: Z-A
            </label>
          </li>
          <li>
            <label>
              <input
                defaultChecked={sortBy === 'low-high'}
                type="radio" 
                name='sortBy' 
                value='low-high'
                onChange={(e) => submit(e.currentTarget.form)}
              />
              Price: Low to High
            </label>
          </li>
          <li>
            <label>
              <input
                defaultChecked={sortBy === 'high-low'}
                type="radio"
                name='sortBy'
                value='high-low'
                onChange={(e) => submit(e.currentTarget.form)}
              />
              Price: High to Low
            </label>
          </li>
        </ul>
      </Form>}
    </div>
  )
}

function Price() {
  const [activePrice, setActivePrice] = useState(false) 
  const { minPrice, maxPrice } = useLoaderData()

  return (
    <div>
      <h3>
        <button onClick={() => setActivePrice(prev => !prev)} 
          aria-expanded={activePrice}
        >
          <span>Price</span>
          <ActiveIndicator size={20} active={activePrice} />
        </button>
      </h3>
      {activePrice && <div>
        <Form method="post">
          <div className={styles.priceFilterWrapper}>
            <input
              name='minPrice'
              defaultValue={minPrice}
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder="MIN"
              aria-label='min price'
            />
            <span> - </span>
            <input
              name='maxPrice'
              defaultValue={maxPrice}
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder="MAX"
              aria-label='max price'
            />
            <button 
              type="submit"
              name="priceFilter"
              value={true}
              onClick={() => {
                if (maxPrice && minPrice > maxPrice) {
                  alert('Minimum price must be smaller than maximum price!')
                }
              }}
              aria-label='apply price filter'
            >Apply</button>
          </div>
        </Form>
      </div>}
    </div>
  )
}

function Tags() {
  const [activeTags, setActiveTags] = useState(false) 
  const tagsList = tags.getTags()

  return (
    <div>
      <h3>
        <button 
          onClick={() => setActiveTags(prev => !prev)} 
          aria-expanded={activeTags}
        >
          <span>Tags</span>
          <ActiveIndicator size={20} active={activeTags} />
        </button>
      </h3>
      {activeTags && <ul className={styles.tagsFilterList}>
        {tagsList.map(tag => {
          return (
            <Tag key={tag} tag={tag} />
          )
        })}
      </ul>}
    </div>
  )
}

function Tag({ tag }) {
  const { tagFilter } = useLoaderData()
  const submit = useSubmit()

  return (
    <li>
      <Form method='post'>
        <input 
          type="hidden"
          name='tag'
          value={tag}
        />
        <label>
          <input 
            type="checkbox"
            checked={tagFilter.includes(tag)}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          {' '}{tag}
        </label>
      </Form>
    </li>
  )
}

function Items({ items }) {
  return (
    <div>
      {items.length > 0
        ? <ItemsList items={items} />
        : <Empty />
      }
    </div>
  )
}

function Empty() {
  return (
    <div>
      <h2>No items match the current filters.</h2> 
    </div>
  )
}

function ItemsList({ items }) {
  return (
    <div>
      <ul className={styles.shopItemsList}>
        {items.map(item => {
          return <Item key={item.id} item={item} />
        })}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li className={styles.shopItemCard} title={item.name + ': ' + item.buyCost + ' gold'}>
      <div className={styles.itemStatusWrapper}>
        <span className={styles.newItemTag}>New</span>
        {!item.stock && <span>Out of Stock</span>}
        {item.discountPercent && <span className={styles.discountTag}>-{item.discountPercent}%</span>}
      </div>
      <Link to={`/shop/${item.id}`}>
        <div className={styles.itemImageWrapper}>
          <img className={styles.itemImage} src={item.image} alt={item.name + ' image'} />
        </div>
      </Link>
      <div className={styles.itemPanel}>
        <h2 className={styles.itemName}>{item.name}</h2>
        <div className={styles.itemPrices}>
          {item.oldPrice 
            && <p
                className={styles.oldPrice} 
                style={{textDecoration: 'line-through'}}
                >{item.oldPrice} gold
              </p>}
          <p>{item.buyCost} gold</p>
        </div>
      </div>
    </li>
  )
}

export default ShopRoute
