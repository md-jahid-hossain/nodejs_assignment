const express = require('express')
const router = express.Router()

const validation = require('../utils/validation')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUser_partially,
  deleteUser,
} = require('../controllers/user.controllers')
const { registerSchema, profileSchema } = require('../schema/user.schema')

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', validation(registerSchema), createUser)

router.put('/:id', validation(profileSchema), updateUser)

router.patch('/:id', validation(profileSchema), updateUser_partially)

router.delete('/:id', deleteUser)

module.exports = router
