import styles from './BreadcrumbsControlsContent.module.css'
import { useState } from 'react';
import { Form, useSubmit, useLoaderData } from 'react-router-dom';
import tags from '../../data/items/tags';
import ActiveIndicator from '../icons/ChevronRight'

export default function BreadcrumbsControlsContent() {
  return (
    <>
      <Sort />
      <Avaliability />
      <Price />
      <Tags />
    </>
  )
}

function Sort() {
  const [activeSort, setActiveSort] = useState(true) 

  return (
    <div>
      <h3>
        <button 
          onClick={() => setActiveSort(prev => !prev)} 
          aria-expanded={activeSort}
        >
          <span>Sort By</span>
          <ActiveIndicator size={20} active={activeSort} />
        </button>
      </h3>

      {activeSort && <Form method="post">
        <ul className={styles.contentList}>
          <SortByListItem sortByValue='default' label='Default' />
          <SortByListItem sortByValue='a-z' label='Alphabetically: A-Z' />
          <SortByListItem sortByValue='z-a' label='Alphabetically: Z-A' />
          <SortByListItem sortByValue='low-high' label='Price: Low to High' />
          <SortByListItem sortByValue='high-low' label='Price: High to Low' />
        </ul>
      </Form>}
    </div>
  )
}

function SortByListItem({ sortByValue, label }) {
  const { sortBy } = useLoaderData()
  const submit = useSubmit()

  return (
    <li>
      <label>
        <input
          defaultChecked={sortBy === sortByValue}
          type="radio"
          name='sortBy'
          value={sortByValue}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        {label}
      </label>
    </li>
  )
}

function Avaliability() {
  const [activeAvailability, setActiveAvailability] = useState(false) 
  const { availability } = useLoaderData()
  const submit = useSubmit()

  return (
    <div>
      <h3>
        <button 
          onClick={() => setActiveAvailability(prev => !prev)} 
          aria-expanded={activeAvailability}
        >
          <span>Availability</span>
          <ActiveIndicator size={20} active={activeAvailability} />
        </button>
      </h3>

      {activeAvailability && <ul className={styles.contentList}>
        <li>
          <Form method='post'>
            <label>
              <input 
                type="checkbox"
                checked={availability.includes('In Stock')}
                onChange={(e) => {
                  submit(e.currentTarget.form)
                }}
              />
              {' '}In Stock
            </label>

            <input type="hidden" name='availability' value='In Stock'/>
          </Form>
        </li>
        <li>
          <Form method='post'>
            <label>
              <input 
                type="checkbox"
                checked={availability.includes('Out of Stock')}
                onChange={(e) => {
                  submit(e.currentTarget.form)
                }}
              />
              {' '}Out of Stock
            </label>

            <input type="hidden" name='availability' value='Out of Stock'/>
          </Form>
        </li>
      </ul>}
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
            <PriceFilterInput 
              name='minPrice'
              value={minPrice}
              placeholder='MIN'
              label='min price'
            />
            <span> - </span>
            <PriceFilterInput 
              name='maxPrice'
              value={maxPrice}
              placeholder='MAX'
              label='max price'
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

function PriceFilterInput({ name, value, placeholder, label }) {
  return (
    <input
      name={name}
      defaultValue={value}
      type='text'
      inputMode='numeric'
      pattern='[0-9]*'
      placeholder={placeholder}
      aria-label={label}
    />
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

      {activeTags && <ul className={styles.contentList}>
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

        <input type="hidden" name='tag' value={tag}/>
      </Form>
    </li>
  )
}