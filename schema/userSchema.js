const { object, string, number } = require('yup')

const userSchema = object().shape({
  first_name: string()
    .required('First name is required')
    .min(3, 'First name must be atleast 3 characters long')
    .max(32, 'First name not more than 32 characters long'),
  last_name: string()
    .required('Last name is required')
    .min(3, 'Last name must be atleast 3 characters long')
    .max(32, 'Last name not more than 32 characters long'),
  age: number()
    .required('Age is required')
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(7, 'Must be 7 years old or above'),
})

module.exports = userSchema
