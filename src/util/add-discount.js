import getMinMax from "./get-min-max"

const addDiscount = (items) => {
  const [p_min, p_max] = getMinMax(items)
  const baseDiscountRate = 0.20
  const discountLowMin = 0.05
  const discountLowMax = 0.15
  const discountHighMin = 0.1
  const discountHighMax = 0.3

  function randRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function giveItemDiscount(discountChance) {
    return discountChance >= (Math.floor(Math.random() * 100))
  }

  return items.map(item => {
    const p = item.buyCost
    const priceNorm = (p - p_min) / (p_max - p_min)
    const discountChance = baseDiscountRate * (0.2 + 0.8 * priceNorm) * 100
    const doesItemHaveDiscount = giveItemDiscount(discountChance)
    if (doesItemHaveDiscount) {
      const discountPercent = (1 - priceNorm) * randRange(discountLowMin, discountLowMax)
      + priceNorm * randRange(discountHighMin, discountHighMax)
      const savedPrice = item.buyCost * discountPercent
      const discountedPrice = item.buyCost - savedPrice
      const discountedPriceRounded = parseInt(discountedPrice.toFixed(0))
      const discountPercentRounded = parseInt((discountPercent * 100).toFixed(0))
      
      item.discountPercent = discountPercentRounded
      item.oldPrice = item.buyCost
      item.buyCost = discountedPriceRounded
    }
    return item
  })
}

export default addDiscount