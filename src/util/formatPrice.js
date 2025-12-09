const formatPrice = (price) => {
  let counter = 0
  let parsedPrice = []

  price.toString().split('').reverse().forEach(c => {
    if (counter === 3) {
      parsedPrice.push(',');
      counter = 0
    }
    parsedPrice.push(c)
    c === '.' ? counter = 0 : counter += 1
  })

  return parsedPrice.reverse().join('')
}

export default formatPrice