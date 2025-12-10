import styles from './App.module.css'
import { useState } from 'react'
import { Outlet, useLoaderData, Form, useNavigate, useSubmit } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useItems from '../util/useItems'
import Header from '../components/header/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import RemoveSearch from '../components/icons/X'
import Search from '../components/icons/Search'
import ScrollToTop from '../components/ScrollToTop';

function App() {
  const { data, error, loading } = useItems()
  const { query, totalQty } = useLoaderData()

  return (
    <>
      <ScrollToTop />
      <Header totalQty={totalQty} >
        <SearchBar query={query} />
      </Header>
      <Main>
        <Outlet context={{ data, error, loading, query }} />
      </Main>
      <Footer />
    </>
  )
}

function SearchBar({ query }) {
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
      transition: { duration: 0.3, timingFunction: 'ease-out' },
    },
    hide: { 
      opacity: 0,
      visibility: 'hidden',
      transition: { duration: 0.3 },
    }
  }

  return (
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
          <Search size={22} />
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
          <RemoveSearch size={20} stroke='#7e7e7e'/>
        </motion.button>
      </motion.div>
    </Form>
  )
}

export default App
