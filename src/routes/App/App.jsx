import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import itemsClass from "../../items";
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

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
      try {
        const versions = await getRequestWithNativeFetch(
          'https://ddragon.leagueoflegends.com/api/versions.json',
          controller.signal
        );
        const latest = versions[0]
        const itemsData = await getRequestWithNativeFetch(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/item.json`,
          controller.signal
        );
        const noImageItems = ['3005', '3173', '3174', '3170', '4402', '4004', '4010']
        const completeItems = Object.entries(itemsData.data)
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
        setData(true)
        itemsClass.setItems(completeItems)
        console.log(completeItems)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Aborted');
          return;
        }
        setError(err.message);
        setData(null)
        itemsClass.setItems(null)
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

  return (
    <>
      <Header />
      <Main>
        <Outlet context={[data, error, loading]} />
      </Main>
      <Footer />
    </>
  )
}

export default App
