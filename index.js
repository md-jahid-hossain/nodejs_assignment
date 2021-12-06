const express = require('express')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const app = express()

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(5000, () => console.log('Listening On Port 5000'))
