const express = require('express')
const {
  productCreateSchema,
  productUpdateSchema,
} = require('../schema/product.schema')
const router = express.Router()

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateProduct_quantity,
  deleteProduct,
  setRating,
} = require('../controllers/product.controllers')
const validation = require('../utils/validation')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', validation(productCreateSchema), createProduct)

router.put('/:id', validation(productCreateSchema), updateProduct)

router.patch('/:id', validation(productUpdateSchema), updateProduct_quantity)

router.delete('/:id', deleteProduct)

router.patch('/rating/:id', validation(productUpdateSchema), setRating)

module.exports = router
