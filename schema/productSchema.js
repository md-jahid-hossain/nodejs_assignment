const { object, string, number } = require('yup')

const productSchema = object().shape({
  title: string().required('Title is not empty'),
  price: number()
    .required('Price is not empty')
    .typeError('Price must be a number'),
  category: string().required('Category is not empty'),
})

module.exports = productSchema