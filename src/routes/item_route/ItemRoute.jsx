import Loading from '../../components/Loading';
import items from '../../data/items/items';
import splitPascalCase from '../../util/splitPascalCase';
import { useState } from 'react';
import { useParams, useOutletContext, Form, Link } from 'react-router-dom'
import styles from './ItemRoute.module.css'

function ItemRoute() {
  const {data, error, loading} = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) {
    return (
      <div className={styles.itemRouteWrapper}>
        <Breadcrumbs />
        <Item />
      </div>
    )
  }
}

function Breadcrumbs() {
  const params = useParams()
  const item = items.getItem(params.itemId)

  return (
    <div className={styles.breadcrumbsWrapper}>
      <nav>
        <ol className={styles.breadcrumbsList}>
          <li>
            <Link to='/'>Home</Link> /
          </li>
          <li>
            <Link to='/shop'>Shop</Link> /
          </li>
          <li className={styles.breadcrumbsCurrent}>
            {item.name}
          </li>
        </ol>
      </nav>
    </div>
  )
}

function Item() {
  const params = useParams()
  const item = items.getItem(params.itemId)
  
  return (
    <div className={styles.itemWrapper}>
      <Image image={item.image} name={item.name} />
      <div className={styles.itemDetails}>
        <Tags tags={item.tags} />
        <Info item={item} />
        <Form method='post'>
          <Input stock={item.stock} cartQty={item.qty} />
          <CallToActions stock={item.stock} />
        </Form>
        <Description description={item.description} />
      </div>
    </div>
  )
}

function Image({ image, name }) {
  return (
    <div className={styles.imageWrapper}>
      <img 
        className={styles.image} 
        src={image} 
        alt={name + ' image'} 
        title={name}
        loading='lazy'
        width={450}
        height={450}
      />
      <div className={styles.imageBackground1}></div>
      <div className={styles.imageBackground2}></div>
    </div>
  )
}

function Tags({ tags }) {
  return (
    <ul className={styles.tagsList}>
      {tags.map((tag, index) => {
        return (
          <li key={tag}>
            {splitPascalCase(tag) + (index === tags.length - 1 ? '' : ' |')}
          </li>
        )
      })}
    </ul>
  )
}

function Info({ item }) {
  return (
    <div>
      <h1 className={styles.itemName}>{item.name}</h1>
      <div className={styles.itemStatusTags}>
        {!item.stock && <div>
          <span>Sold Out</span>
        </div>}
        {item.discountPercent && <div className={styles.discountTag}>
          <span>-{item.discountPercent}%</span>
        </div>}
      </div>
      <div className={styles.itemPrices}>
        {item.oldPrice && <p className={styles.oldPrice}>{item.oldPrice} gold</p>}
        <p>{item.buyCost} gold</p>
      </div>
    </div>
  )
}

function Input({ stock, cartQty }) {
  const [qtyInput, setQtyInput] = useState(1)
  const available = (cartQty + qtyInput) <= stock

  return (
    <div className={styles.quantityInfoWrapper}>
      <p>Stock: <span className={styles.stockValue}>{stock}</span></p>
      <p className={styles.quantityInputWrapper}>
        <button 
          className={`${styles.quantityDecrement}` 
            + (qtyInput == 1 ? ` ${styles.quantityChangeInvalid}` : '')}
          type='button' 
          onClick={() => {
            if (qtyInput > 1) {
              setQtyInput((q) => q - 1)
            } else {
              setQtyInput(1)
            }
          }}
          aria-label='decrement'
        >-</button>
        <input
          type="hidden"
          name='available'
          value={available}
        />
        <input
          type="hidden"
          name='cartQty'
          value={cartQty}
        />
        <input
          className={styles.quantityInput}
          name='qty'
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (/^\d*$/.test(value) && value) {
              setQtyInput(value);
            }
          }}
          value={qtyInput}
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          />
        <button
          className={`${styles.quantityIncrement}` 
            + (!available ? ` ${styles.quantityChangeInvalid}` : '')}
          type='button' 
          onClick={() => {
            setQtyInput((q) => q + 1)
          }}
          aria-label='increment'
        >+</button>
      </p>
      {!available 
        ? <p className={styles.addToCartError}>You have reached the maximum quantity available for this item!</p> 
        : null}
    </div>
  )
}

function CallToActions() {
  return (
    <div className={styles.callToActionsWrapper}>
      <input
        type="hidden"
        name='addToCart'
        value={true}
      />
      <button 
        className={styles.addToCart}
        type='submit' 
        aria-label='add to cart'
        /* onClick={() => setQuantity(1)} */
      >
        Add to cart
      </button>
      <button 
        className={styles.buyItNow}
        type='submit' 
        name='buy'
        value={true}
        aria-label='buy it now'
      >
        Buy it now
      </button>
    </div>
  )
}

function Description({ description }) {
    return (
      <div className={styles.descriptionWrapper}>
        <p className={styles.descriptionHeader}>Description</p>
        <p>{description}</p>
        {/* Features / Stats */}
      </div>
    )
}

export default ItemRoute
