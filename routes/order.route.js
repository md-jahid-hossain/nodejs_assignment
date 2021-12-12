const express = require('express')
const router = express.Router()

const {showOrders, showOrder, createOrder} =require('../controllers/order.controller')

router.get('/', showOrders)

router.get('/:id', showOrder)

router.post('/', createOrder)

module.exports = router