import items from '../data/items/items';
import BreadcrumbsBar from './breadcrumbs/BreadcrumbsBar';
import Items from '../routes/shop_route/Items';
import EmptySearchResults from './results/Results';

export default function Shop({ category = '' }) {
  const itemsList = items.getItems(category)

  return (
    <div>
      <BreadcrumbsBar items={itemsList} />
      {itemsList.length > 0
        ? (
          <Items items={itemsList} />
        )
        : (
          <EmptySearchResults
            mainHeading='No items match the current filters'
            mainParagraph='Just... what were you looking for, summoner?'
          >
          </EmptySearchResults>
        )
      }
    </div>
  )
}