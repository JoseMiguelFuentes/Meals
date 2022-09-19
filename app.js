const express = require('express')
const { usersRouter } = require('./routes/users.routes')


const app = express()

app.use(express.json())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/restaurants', eateryRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/user', userRouter)