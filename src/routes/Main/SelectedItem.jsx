import { useState } from 'react';
import itemsClass from '../../items';
import splitPascalCase from '../../util/split-pascal-case';
import { useNavigate, useParams, useOutletContext, Form } from 'react-router-dom'


function SelectedItem() {
  const [quantity, setQuantity] = useState(1)
  const [data, error, loading ] = useOutletContext()
  const params = useParams()
  const navigate = useNavigate()

  if (error) return <>{error}</>
  if (loading) return <>{'Loading...'}</>
  if (data) {
    const item = itemsClass.getItem(params.itemId)
    return (
      <>
        <div>
          <button type='button' onClick={() => navigate(-1)}>Back</button>
          <div>
            <img src={item.image} alt={item.name + ' image'} />
          </div>
          <p>ID: {item.id}</p>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.buyCost} Gold</p>
          <ul>
            {item.tags.map(tag => {
              return (
                <li key={tag}>
                  {splitPascalCase(tag)}
                </li>
              )
            })}
          </ul>
          <Form method='post'>
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
                defaultValue={1}
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
              /* onClick={() => setQuantity(1)} */
            >
              Buy it now
            </button>
          </Form>
        </div>
      </>
    )
  }
}

export default SelectedItem
