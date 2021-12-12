const users = []

const getUsers = (req, res) => {
  res.send(users)
}

const getUser = (req, res) => {
  const { id } = req.params

  const user = users.find((user) => user.id == id)
  if (user) return res.send(user)

  return res.status(404).send('User does not exists anymore')
}

const createUser = async (req, res) => {
  const { username, email, password, confirm_password } = req.body

  const checkUsernameExist = users.find((user) => user.username === username)
  if (checkUsernameExist)
    return res.status(500).send('Duplicate username. Try Another...')

  try {
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
    }
    users.push(newUser)

    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, age, phone_number, address } = req.body

  try {
    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).send('User does not exits anymore')

    const idx = users.indexOf(user)
    users[idx] = { ...user, first_name, last_name, age, phone_number, address }

    res.status(201).send(users[idx])
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateUser_partially = async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, age, phone_number, address } = req.body

  try {
    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).send('User does not exits anymore')

    const idx = users.indexOf(user)
    if (first_name) users[idx].first_name = first_name
    if (last_name) users[idx].last_name = last_name
    if (age) users[idx].age = age
    if (phone_number) users[idx].phone_number = phone_number
    if (address) users[idx].address = address

    res.status(201).send(users[idx])
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteUser = (req, res) => {
  const { id } = req.params

  const user = users.find((user) => user.id == id)
  if (!user) return res.status(404).send('User does not exits anymore')

  const idx = users.indexOf(user)
  users.splice(idx, 1)

  res.send('Successfully deleted an user')
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUser_partially,
  deleteUser,
}
