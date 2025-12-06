import items from '../data/items/items';
import { useState, useEffect } from 'react'

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

const getLatest = async (controller) => {
  const versions = await getRequestWithNativeFetch(
    'https://ddragon.leagueoflegends.com/api/versions.json',
    controller.signal
  );
  return versions[0]
}

const getItems = async (controller, latest) => {
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

const useItems = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        const latest = await getLatest(controller)
        const allItems = await getItems(controller, latest)
        const completeItems = getCompleteItems(allItems)
        items.setItems(completeItems)
        setData(true)
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Aborted');
          return;
        }
        items.setItems(null)
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

export default useItems