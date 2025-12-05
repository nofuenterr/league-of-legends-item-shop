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
      <Image image={item.image} name={item.name} />
      <Info item={item} />
      <Tags tags={item.tags} />
      <Form method='post'>
        <Input stock={item.stock} cartQty={item.qty} />
        <CallToActions stock={item.stock} />
      </Form>
    </div>
  )
}

function Image({ image, name }) {
  return (
    <div>
      <img src={image} alt={name + ' image'} />
    </div>
  )
}

function Info({ item }) {
  return (
    <div>
      {!item.stock && <p>Sold Out</p>}
      <p>ID: {item.id}</p>
      <p>{item.name}</p>
      <p>{item.description}</p>
      {item.discountPercent && <p>{item.discountPercent}% Off</p>}
      {item.oldPrice && <p style={{textDecoration: 'line-through'}}>Old Price: {item.oldPrice} Gold</p>}
      <p>Price: {item.buyCost} Gold</p>
      <p>Stock: {item.stock}</p>
    </div>
  )
}

function Tags({ tags }) {
  return (
    <ul>
      {tags.map(tag => {
        return (
          <li key={tag}>
            {splitPascalCase(tag)}
          </li>
        )
      })}
    </ul>
  )
}

function Input({ stock, cartQty }) {
  const [qtyInput, setQtyInput] = useState(1)
  const available = (cartQty + qtyInput) <= stock

  return (
    <div>
      <p>
        <button 
          type='button' 
          onClick={() => {
            if (qtyInput > 1) {
              setQtyInput((q) => q - 1)
            } else {
              setQtyInput(1)
            }
          }}
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
          type='button' 
          onClick={() => {
            setQtyInput((q) => q + 1)
          }}
        >+</button>
      </p>
      {!available 
        ? <p>You have reached the maximum quantity available for this item</p> 
        : null}
    </div>
  )
}

function CallToActions() {
  return (
    <div>
      <input
        type="hidden"
        name='addToCart'
        value={true}
      />
      <button 
        type='submit' 
        /* onClick={() => setQuantity(1)} */
      >
        Add to cart
      </button>
      <button 
        type='submit' 
        name='buy'
        value={true}
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
