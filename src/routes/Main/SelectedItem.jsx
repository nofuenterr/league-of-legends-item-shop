import { useState } from 'react';
import itemsClass from '../../items';
import splitPascalCase from '../../util/split-pascal-case';
import { useNavigate, useParams, useOutletContext, Form } from 'react-router-dom'

function SelectedItem() {
  const {data, error, loading} = useOutletContext()
  const navigate = useNavigate()

  if (error) return <>{error}</>
  if (loading) return <Loading />
  if (data) {
    return (
      <div>
        <button type='button' onClick={() => navigate(-1)}>Back</button>
        <Item />
      </div>
    )
  }
}

function Item() {
  const params = useParams()
  const item = itemsClass.getItem(params.itemId)

  return (
    <div>
      <Image item={item} />
      <Info item={item} />
      <Tags item={item} />
      <Form method='post'>
        <Input />
        <CallToActions />
      </Form>
    </div>
  )
}

function Image({ item }) {
  return (
    <div>
      <img src={item.image} alt={item.name + ' image'} />
    </div>
  )
}

function Info({ item }) {
  return (
    <div>
      <p>ID: {item.id}</p>
      <p>{item.name}</p>
      <p>{item.description}</p>
      {item.discountPercent && <p>{item.discountPercent}% Off</p>}
      {item.oldPrice && <p style={{textDecoration: 'line-through'}}>Old Price: {item.oldPrice} Gold</p>}
      <p>Price: {item.buyCost} Gold</p>
    </div>
  )
}

function Tags({ item }) {
  return (
    <ul>
      {item.tags.map(tag => {
        return (
          <li key={tag}>
            {splitPascalCase(tag)}
          </li>
        )
      })}
    </ul>
  )
}

function Input() {
  const [quantity, setQuantity] = useState(1)

  return (
    <p>
      <button 
        type='button' 
        onClick={() => {
          if (quantity > 1) setQuantity((qty) => qty - 1)
        }}
      >-</button>
      <input
        name='qty'
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setQuantity(value);
          }
        }}
        value={quantity}
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        />
      <button 
        type='button' 
        onClick={() => setQuantity((qty) => qty + 1)}
      >+</button>
    </p>
  )
}

function CallToActions() {
  return (
    <div>
      <button 
        type='submit' 
        name='intent'
        value='add'
        /* onClick={() => setQuantity(1)} */
      >
        Add to cart
      </button>
      <button 
        type='submit' 
        name='intent'
        value='buy'
      >
        Buy it now
      </button>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <p>Loading items...</p>
    </div>
  )
}

export default SelectedItem
