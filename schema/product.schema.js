const { object, string, number, array } = require('yup')

const productSchema = {
  title: string().required('Title is not empty'),
  price: number()
    .required('Price is not empty')
    .typeError('Price must be a number')
    .positive('Price must be a positive number.'),
  category: string().required('Category is not empty'),
  rating: number()
    .typeError('Rating must be a number.')
    .required('Rating is required.')
    .test(
      'is-valid-rating',
      'Rating must be 0 to 5',
      (rating) => rating >= 0 && rating <= 5
    ),
}

const productCreateSchema = object().shape({
  title: productSchema.title,
  price: productSchema.price,
  category: productSchema.category,
  quantity: number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be a positive number')
    .integer('Quantity must be a integer number')
    .min(1, 'Minimum 1 product is required.'),
})

const productUpdateSchema = object().shape({
  rating: productSchema.rating,
  quantity: number()
    .typeError('Quantity must be a number')
    .positive('Quantity must be a positive number')
    .integer('Quantity must be a integer number')
    .min(1, 'Minimum 1 product is required.'),
})

module.exports = { productCreateSchema, productUpdateSchema }
