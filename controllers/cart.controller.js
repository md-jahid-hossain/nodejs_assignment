const { products } = require('./product.controller')

const cart = []

const showCart = (req, res) => {
  const cartDetails = []
  let totalPrice = 0
  let totalItem = 0

  cart.forEach((item) => {
    const product = products.find((product) => product.id == item.id)
    const quantity = item.quantity

    cartDetails.push([product, { quantity, price: product.price * quantity }])

    totalPrice += product.price * quantity
    totalItem += quantity
  })

  res.send([cartDetails, { totalPrice, totalItem }])
}

const handleCart = (req, res) => {
  const { action, id } = req.params

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

  const cartItem = cart.find((cartItem) => cartItem.id == id)

  if (action === 'increment') {
    if (!cartItem) cart.push({ id, quantity: 1 })
    else {
      const idx = cart.indexOf(cartItem)
      cart[idx] = {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      }
    }
  } else if (action === 'decrement') {
    if (!cartItem)
      return res.status(404).send('Product does not exists into the cart')
    else {
      const idx = cart.indexOf(cartItem)
      cart[idx] = {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      }
      if (cart[idx].quantity === 0) cart.splice(idx, 1)
    }
  } else return res.status(400).send('Bad Routes')

  res.status(201).send(product)
}

const removeSingleProduct = (req, res) => {
  const { id } = req.params

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

  const cartItem = cart.find((cartItem) => cartItem.id == id)
  if (!cartItem)
    return res.status(404).send('Product does not exists into the cart')

  const idx = cart.indexOf(cartItem)
  cart.splice(idx, 1)

  res.send('Successfully removed product from the cart')
}

const deleteCart = (req, res) => {
  cart.splice(0, cart.length)

  res.send(cart)
}

module.exports = { cart, showCart, handleCart, removeSingleProduct, deleteCart }
