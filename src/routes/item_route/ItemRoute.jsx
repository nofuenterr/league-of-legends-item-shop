import Loading from '../../components/Loading';
import items from '../../data/items/items';
import splitPascalCase from '../../util/splitPascalCase';
import { useParams, useOutletContext, Link } from 'react-router-dom'
import styles from './ItemRoute.module.css'
import ItemForm from './ItemForm';

export default function ItemRoute() {
  const {data, error, loading} = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) {
    return (
      <div className={styles.itemRouteWrapper}>
        <BreadcrumbsBar />
        <Item />
      </div>
    )
  }
}

function BreadcrumbsBar() {
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
        <ItemForm item={item} />
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

function Description({ description }) {
    return (
      <div className={styles.descriptionWrapper}>
        <p className={styles.descriptionHeader}>Description</p>
        <p>{description}</p>
        {/* Features / Stats */}
      </div>
    )
}
