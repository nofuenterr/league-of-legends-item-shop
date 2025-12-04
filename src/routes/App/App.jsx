import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import itemsClass from "../../items";
import { useState, useEffect } from 'react'
import { Outlet, useLoaderData, Form, useNavigate } from 'react-router-dom'

const getRequestWithNativeFetch = async (
  url,
  signal = null
) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
}

const useItems = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      const getLatest = async () => {
        const versions = await getRequestWithNativeFetch(
          'https://ddragon.leagueoflegends.com/api/versions.json',
          controller.signal
        );
        return versions[0]
      }

      const getItems = async (latest) => {
        return await getRequestWithNativeFetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/item.json`,
          controller.signal
        );
      }

      const getCompleteItems = (items) => {
        const noImageItems = ['3005', '3173', '3174', '3170', '4402', '4004', '4010']

        return Object.entries(items.data)
          .filter(([id, item]) => (
              (!item.into || item.into.length === 0) 
              && item.gold.purchasable 
              && item.plaintext
              && item.gold.total
              && !noImageItems.includes(id)
            )
          )
          .map(([id,item]) => ({
            id,
            name: item.name,
            description: item.plaintext,
            buyCost: item.gold.total,
            stats: item.stats,
            tags: item.tags,
            image: `https://leagueofitems.com/images/items/256/${id}.webp`,
          }))
      }

      try {
        const latest = await getLatest()
        const items = await getItems(latest)
        const completeItems = getCompleteItems(items)
        itemsClass.setItems(completeItems)
        setData(true)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Aborted');
          return;
        }
        itemsClass.setItems(null)
        setData(null)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 3000);

    return () => controller.abort();
  }, [])

  return { data, error, loading }
}

function App() {
  const { data, error, loading } = useItems()
  const [query, setQuery] = useState('')
  const totalQty = useLoaderData()
  const navigate = useNavigate()

  return (
    <>
      <Header totalQty={totalQty} >
        <Form role='search'>
          <input 
            type='search' 
            id='search'
            name='search'
            placeholder='Search item...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            onClick={() => {
              navigate('/shop')
            }}
          />
        </Form>
      </Header>
      <Main>
        <Outlet context={{data, error, loading, query, setQuery}} />
      </Main>
      <Footer />
    </>
  )
}

export default App
