const { object, string, number, array, ref } = require('yup')

const userSchema = {
  username: string()
    .required('Username is required.')
    .matches()
    .min(3, 'User name must be at least 3 characters long.')
    .max(32, 'User name not more than 32 characters long.'),
  email: string()
    .required('Email is required.')
    .email('Must be a valid email address.')
    .max(100, 'Email not more than 100 characters long.')
    .test(
      'is-valid-email-length',
      'Before @ the email not more than 64 characters long.',
      (email) => email.split('@')[0].length <= 64
    ),
  password: string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      'Password must include at least one uppercase, lowercase, number and special character.'
    ),
  confirm_password: string().oneOf([ref('password')], 'Passwords must match.'),
  first_name: string()
    .matches(/^[a-zA-Z]*$/, 'First name allowed only English Alphabets.')
    .min(3, 'First name must be at least 3 characters long.')
    .max(32, 'First name not more than 32 characters long.'),
  last_name: string()
    .matches(/^[a-zA-Z]*$/, 'First name allowed only English Alphabets.')
    .min(3, 'Last name must be at least 3 characters long.')
    .max(32, 'Last name not more than 32 characters long.'),
  age: number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(7, 'Must be 7 years old or above'),
  phone_number: string()
    .matches(/^[0-9]+$/, 'Phone number Allowed only numbers.')
    .max(11, 'Phone number not more than 11 digits.'),
  address: array().of(
    object().shape({
      road_number: string().required('Road number is required.'),
      house_number: string().required('House number is required.'),
      zip_code: string().required('Zip code is required.'),
      district: string().required('District is required'),
      country: string().required('Country is required'),
    })
  ),
}

const registerSchema = object().shape({
  username: userSchema.username,
  email: userSchema.email,
  password: userSchema.password,
  confirm_password: userSchema.confirm_password,
})

const profileSchema = object().shape({
  first_name: userSchema.first_name,
  last_name: userSchema.last_name,
  age: userSchema.age,
  phone_number: userSchema.phone_number,
  address: userSchema.address,
})

module.exports = { registerSchema, profileSchema }
