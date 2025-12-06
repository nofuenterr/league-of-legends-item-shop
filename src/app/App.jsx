import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import useItems from '../util/useItems'
import { useState } from 'react'
import { Outlet, useLoaderData, Form, useNavigate, useSubmit } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import styles from './App.module.css'
import RemoveSearch from '../../public/X'
import Search from '../../public/Search'

function App() {
  const { data, error, loading } = useItems()
  const { query, totalQty } = useLoaderData()
  const [searchExpanded, setSearchExpanded] = useState(false)
  const navigate = useNavigate()
  const submit = useSubmit()
  const searchWrapper = {
    initial: {
      width: 'var(--expand-search-width)',
    },
    expanded: { 
      width: '100%',
      transition: { duration: 0.6 },
    },
    collapsed: { 
      width: 'var(--expand-search-width)',
      transition: { duration: 0.6 },
    }
  }
  const searchElement = {
    initial: {
      opacity: 0,
      visibility: 'hidden',
    },
    show: { 
      opacity: 1,
      visibility: 'visible',
      transition: { duration: 0.3 },
    },
    hide: { 
      opacity: 0,
      visibility: 'hidden',
      transition: { duration: 0.3 },
    }
  }

  return (
    <>
      <Header totalQty={totalQty} >
        <Form method='post' role='search' aria-expanded={searchExpanded}>
          <motion.div className={styles.searchWrapper}
            variants={searchWrapper}
            initial={'initial'}
            animate={searchExpanded ? "expanded" : "collapsed"}
          >
            <button
              type='button'
              aria-label='expand search'
              className={styles.expandSearch}
              onClick={() => {
                setSearchExpanded(prev => !prev)
              }}
            >
              <Search 
                size={22}
                stroke='#fff'
              />
            </button>
            <motion.input
              variants={searchElement}
              initial={'initial'}
              animate={searchExpanded ? "show" : "hide"}
              className={styles.searchInput}
              type='search' 
              id='search'
              name='search'
              placeholder='Search items...'
              value={query}
              onChange={(e) => {
                submit(e.currentTarget.form)
              }}
              onClick={() => {
                navigate('/shop')
              }}
              aria-label='search items'
            />
            <motion.button 
              variants={searchElement}
              initial={'initial'}
              animate={searchExpanded ? "show" : "hide"}
              type='submit'
              name='removeSearch'
              value={true}
              className={styles.removeSearch}
              aria-label='remove search'
            >
              <RemoveSearch 
                size={20}
                stroke='#7e7e7e'
              />
            </motion.button>
          </motion.div>
        </Form>
      </Header>
      <Main>
        <Outlet context={{ data, error, loading, query }} />
      </Main>
      <Footer />
    </>
  )
}

export default App
