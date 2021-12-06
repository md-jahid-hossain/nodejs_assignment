const express = require('express')
const userSchema = require('../schema/userSchema')
const router = express.Router()

const users = [
  { id: 1, first_name: 'Jahid', last_name: 'Hossain', age: 23 },
  { id: 2, first_name: 'Abdur', last_name: 'Rahman', age: 25 },
]

const validation = async (user) => {
  try {
    await userSchema.validate(user, { abortEarly: false })
    return null
  } catch (error) {
    const errors = []
    error.inner.forEach((err) => {
      const isPathExist = errors.find((e) => e.path === err.path)
      if (!isPathExist) errors.push({ path: err.path, message: err.message })
    })
    return errors
  }
}

router.get('/', (req, res) => {
  res.send(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const user = users.find((user) => user.id == id)

  if (user) return res.send(user)
  return res.status(404).send('User does not exists anymore')
})

router.post('/', async (req, res) => {
  const { first_name, last_name, age } = req.body

  try {
    const err = await validation(req.body)
    if (err) return res.status(400).send(err)

    const newUser = { id: users.length + 1, first_name, last_name, age }
    users.push(newUser)

    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, age } = req.body

  try {
    const err = await validation(req.body)
    if (err) return res.status(400).send(err)

    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).send('User does not exits anymore')

    const idx = users.indexOf(user)
    users[idx] = { ...user, first_name, last_name, age }

    res.status(201).send(users[idx])
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  let { first_name, last_name, age } = req.body

  try {
    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).send('User does not exits anymore')

    first_name = first_name || user.first_name
    last_name = last_name || user.last_name
    age = age || user.age

    const updateBody = { first_name, last_name, age }

    const err = await validation(updateBody)
    if (err) return res.status(400).send(err)

    const idx = users.indexOf(user)
    users[idx] = { ...user, first_name, last_name, age }

    res.status(201).send(users[idx])
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const user = users.find((user) => user.id == id)
  if (!user) return res.status(404).send('User does not exits anymore')

  const idx = users.indexOf(user)
  users.splice(idx, 1)

  res.send('Successfully deleted an user')
})

module.exports = router
