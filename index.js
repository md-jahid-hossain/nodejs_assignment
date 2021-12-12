const express = require('express')
const userRouter = require('./routes/user.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')

const app = express()
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.listen(5000, () => console.log('Listening On Port 5000'))
