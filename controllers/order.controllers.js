const { cart } = require('./cart.controllers')

const orders = []

const showOrders = (req, res) => {
  res.send(orders)
}

const showOrder = (req, res) => {
  const { id } = req.params

  const order = orders.find((order) => order.id == id)
  if (!order) return res.status(404).send('Not found any order with this id')

  res.send(order)
}

const createOrder = (req, res) => {
  if (cart.length === 0) return res.status(400).send('Your cart is empty.')

  const newOrder = [{ id: orders.length + 1, ...cart }]
  orders.push(newOrder)

  cart.splice(0, cart.length)

  res.status(201).send('Successfully created an order')
}

module.exports = { showOrders, showOrder, createOrder }
