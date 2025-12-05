import getMinMax from "./get-min-max"

const addDiscountAndStock = (items) => {
  const [p_min, p_max] = getMinMax(items)
  const baseDiscountRate = 0.20
  const discountLowMin = 0.05
  const discountLowMax = 0.15
  const discountHighMin = 0.1
  const discountHighMax = 0.3
  const stockMin = 5
  const stockMax = 50

  function randRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function determineItemDiscount(discountChance) {
    return discountChance >= (Math.floor(Math.random() * 100))
  }

  function addStock(priceNorm) {
    const stockWeight = 1 - priceNorm
    const stock = stockMin + stockWeight * (stockMax - stockMin) * randRange(0.5, 1.2)
    return Math.round(stock)
  }

  return items.map(item => {
    const p = item.buyCost
    const priceNorm = (p - p_min) / (p_max - p_min)
    const discountChance = baseDiscountRate * (0.2 + 0.8 * priceNorm) * 100
    const doesItemHaveDiscount = determineItemDiscount(discountChance)
    if (doesItemHaveDiscount) {
      const discountPercent = (1 - priceNorm) * randRange(discountLowMin, discountLowMax)
      + priceNorm * randRange(discountHighMin, discountHighMax)
      const savedPrice = item.buyCost * discountPercent
      const discountedPrice = item.buyCost - savedPrice
      const discountedPriceRounded = Math.round(discountedPrice)
      const discountPercentRounded = Math.round(discountPercent * 100)
      
      item.discountPercent = discountPercentRounded
      item.oldPrice = item.buyCost
      item.buyCost = discountedPriceRounded
    }
    item.stock = addStock(priceNorm)
    item.qty = 0
    return item
  })
}

export default addDiscountAndStock