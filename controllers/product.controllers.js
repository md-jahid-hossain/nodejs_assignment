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

const getProducts = (req, res) => {
  res.send(products)
}

const getProduct = (req, res) => {
  const { id } = req.params

  const product = products.find((product) => product.id == id)
  if (product) return res.send(product)

  res.status(404).send('Product does not exists anymore')
}

const createProduct = async (req, res) => {
  const { title, price, category, quantity } = req.body

  try {
    const newProduct = {
      id: products.length + 1,
      title,
      price,
      category,
      quantity,
    }
    products.push(newProduct)

    res.status(201).send(newProduct)
  } catch (error) {
    res.send(error)
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { title, price, category, quantity } = req.body

  try {
    const product = products.find((product) => product.id == id)
    if (!product) return res.status(404).send('Product does not exists anymore')

    const idx = products.indexOf(product)
    products[idx] = { ...product, title, price, category, quantity }

    res.status(201).send(products[idx])
  } catch (error) {
    res.send(error)
  }
}

const updateProduct_quantity = async (req, res) => {
  const { id } = req.params
  let { quantity } = req.body

  try {
    const product = products.find((product) => product.id == id)
    if (!product) return res.status(404).send('Product does not exists anymore')

    const idx = products.indexOf(product)
    products[idx].quantity = quantity

    res.status(201).send(products[idx])
  } catch (error) {
    res.send(error)
  }
}

const deleteProduct = (req, res) => {
  const { id } = req.params

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

  const idx = products.indexOf(product)
  products.splice(idx, 1)

  res.status(201).send('Successfully deleted a product')
}

const setRating = (req, res) => {
  const { id } = req.params
  const { rating } = req.body

  const product = products.find((product) => product.id == id)
  if (!product) return res.status(404).send('Product does not exists anymore')

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
}

module.exports = {
  products,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProduct_quantity,
  deleteProduct,
  setRating,
}
