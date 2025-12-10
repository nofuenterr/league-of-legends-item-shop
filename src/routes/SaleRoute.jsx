import { useOutletContext } from 'react-router-dom';
import LoadingItems from '../components/results/Results';
import Shop from '../components/Shop';

export default function SaleRoute() {
  const { data, error, loading } = useOutletContext()

  if (error) return <>{error}</>
  if (loading) return (
    <LoadingItems
      mainHeading='Loading...'
      mainParagraph='Noxian supply lines are moving your gear through the front.'
    >
    </LoadingItems>
  )
  if (data) return <Shop category='sale' />
}

