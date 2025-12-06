const getMinMax = (items) => {
  let min = 0
  let max = 0
  items.forEach(item => {
    if (min === 0) min = item.buyCost
    if (item.buyCost <= min) min = item.buyCost
    if (item.buyCost >= max) max = item.buyCost
  })
  return [min, max]
}

export default getMinMax