const express = require('express')
const router = express.Router()

const {
  showCart,
  handleCart,
  removeSingleProduct,
  deleteCart,
} = require('../controllers/cart.controllers')

router.get('/', showCart)

router.post('/:action/:id', handleCart)

router.put('/:id', removeSingleProduct)

router.delete('/', deleteCart)

module.exports = router