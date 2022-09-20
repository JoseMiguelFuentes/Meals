const express = require('express')
//Import Routes
const { eateryRouter } = require('./routes/eatery.routes')
const { mealRouter } = require('./routes/meal.routes')
const { orderRouter } = require('./routes/order.routes')
const { userRouter } = require('./routes/user.routes')
const { catchAsync } = require('./util/catchAsyncUtil')


const app = express()

app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/restaurants', eateryRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/meals', mealRouter)



app.all('*', (req, res, next)=>{
  const {method, url} = req
  return next(catchAsync(`${method} ${url} doesn't exist in our server`,404))
  // response.status(404).json({
  //   status: 'error',
  //   message: `${method} ${url} doesn't exist in our server`
  // })
})


module.exports = {app}