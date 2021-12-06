const express = require('express')
const productSchema = require('../schema/productSchema')
const router = express.Router()

const products = [
  {
    id: 1,
    title: 'Bata Shoe 1',
    price: 999,
    category: 'Shoe',
    rate: { rating: 4.9, count: 50 },
  },
  {
    id: 2,
    title: 'OPPO F5',
    price: 25000,
    category: 'Mobile',
    rate: { rating: 4.5, count: 55 },
  },
]

const validation = async (product) => {
  try {
    await productSchema.validate(product, { abortEarly: false })
    return null
  } catch (error) {
    const errors = []
    error.inner.forEach((err) => {
      const isPathExist = errors.find((e) => err.path === e.path)
      if (!isPathExist) errors.push({ path: err.path, message: err.message })
    })
    return errors
  }
}

router.get('/', (req, res) => {
  res.send(products)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const product = products.find((product) => product.id == id)

  if (product) return res.send(product)
  res.status(404).send('Product does not exists anymore')
})

router.post('/', async (req, res) => {
  const { title, price, category } = req.body

  try {
    const err = await validation(req.body)
    if (err) return res.status(400).send(err)

    const newProduct = { id: products.length + 1, title, price, category }
    products.push(newProduct)

    res.status(201).send(newProduct)
  } catch (error) {
    res.send(error)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, price, category } = req.body

  try {
    const product = products.find((product) => product.id == id)
    if (!product) return res.status(404).send('Product does not exists anymore')

    const err = await validation(req.body)
    if (err) return res.status(400).send(err)

    const idx = products.indexOf(product)
    products[idx] = { ...product, title, price, category }

    res.status(201).send(products[idx])
  } catch (error) {
    res.send(error)
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  let { title, price, category } = req.body

  try {
    const product = products.find((product) => product.id == id)
    if (!product) return res.status(404).send('Product does not exists anymore')

    title = title || product.title
    price = price || product.price
    category = category || product.category

    const updatedBody = { title, price, category }

    const err = await validation(updatedBody)
    if (err) return res.status(400).send(err)

    const idx = products.indexOf(product)
    products[idx] = { ...product, title, price, category }

    res.status(201).send(products[idx])
  } catch (error) {
    res.send(error)
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

  const idx = products.indexOf(product)
  products.splice(idx, 1)

  res.status(201).send('Successfully deleted a product')
})

router.put('/rating/:id', (req, res) => {
  const { id } = req.params
  const { rating } = req.body

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

  if (typeof rating !== 'number' || rating < 0 || rating > 5)
    return res.status(400).send([
      {
        path: 'rating',
        message: 'Rating must be a number and value must be 0 to 5',
      },
    ])

  const idx = products.indexOf(product)
  let rate = { rating, count: 1 }

  if (!product.rate) products[idx] = { ...product, rate }
  else {
    const newRating =
      (product.rate.rating * product.rate.count + rating) /
      (product.rate.count + 1)

    rate = {
      rating: parseFloat(newRating.toFixed(2)),
      count: product.rate.count + 1,
    }

    products[idx] = { ...product, rate }
  }

  res.status(201).send(products[idx])
})

module.exports = router
