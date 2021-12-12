const { object, number } = require('yup')

const cartSchema = object().shape({
  quantity: number()
    .typeError('Quantity must be a number')
    .positive('Quantity must be a positive number')
    .integer('Quantity must be a integer number')
    .min(1, 'Minimum 1 product is required.'),
})

module.exports = cartSchema
