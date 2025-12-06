import getMinMax from "./getMinMax"

const randRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const determineItemDiscount = (discountChance) => {
  return discountChance >= (Math.floor(Math.random() * 100))
}

const addDiscountAndStock = (items) => {
  const [p_min, p_max] = getMinMax(items)
  const BASE_DISCOUNT_RATE = 0.20
  const DISCOUNT_LOW_MIN = 0.05
  const DISCOUNT_LOW_MAX = 0.15
  const DISCOUNT_HIGH_MIN = 0.1
  const DISCOUNT_HIGH_MAX = 0.3
  const STOCK_MIN = 5
  const STOCK_MAX = 50

  function addStock(priceNorm) {
    const stockWeight = 1 - priceNorm
    const stock = STOCK_MIN + stockWeight * (STOCK_MAX - STOCK_MIN) * randRange(0.5, 1.2)
    return Math.round(stock)
  }

  return items.map(item => {
    const p = item.buyCost
    const priceNorm = (p - p_min) / (p_max - p_min)
    const discountChance = BASE_DISCOUNT_RATE * (0.2 + 0.8 * priceNorm) * 100
    const doesItemHaveDiscount = determineItemDiscount(discountChance)
    if (doesItemHaveDiscount) {
      const discountPercent = (1 - priceNorm) * randRange(DISCOUNT_LOW_MIN, DISCOUNT_LOW_MAX)
      + priceNorm * randRange(DISCOUNT_HIGH_MIN, DISCOUNT_HIGH_MAX)
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