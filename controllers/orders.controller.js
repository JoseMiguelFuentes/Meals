
const { Meal } = require("../models/mealM")
const { Order } = require("../models/orderM")
const { Eatery } = require("../models/restaurantM")
const { appError } = require("../util/appError.util")
//util
const { catchAsync } = require("../util/catchAsyncUtil")

const createOrder = catchAsync(async (req, res, next) => {
  const {id}= req.sessionUser
  const { quantity,mealId } = req.body
  const meal = await Meal.findByPk(mealId)
  if (!meal) {
    return next( new appError('Error: Meal requested does not exist',400) )
  }
  const newOrder = await Order.create({
    mealId,
    quantity,
    userId:id,
    totalPrice: meal.price * quantity
  })
  res.status(201).json({
    status: 'success',
    data: {newOrder}
  })
})

const getAllUserOrder = catchAsync(async (req, res, next) => {
  const {id}= req.sessionUser
  const orders = await Order.findAll({where:{userId:id},
    attributes:{exclude:['createdAt','updatedAt']},
    include:[{model:Meal,attributes:{exclude:['createdAt','updatedAt']},
      include:{model:Eatery,attributes:{exclude:['createdAt','updatedAt']}}}]
  })
  
  res.status(200).json({
    status: 'success',
    data: {orders}
  })
})

const updateOrder = catchAsync(async (req, res, next)=>{
  const {order} = req
  await order.update({status: 'completed'})
  res.status(200).json({
    status:'success',
    data:{order}
  })
})

const deleteOrder = catchAsync(async (req, res, next)=>{
  const {order} = req
  await order.update({status: 'cancelled'})
  res.status(204).json({
    status:'success'
  })
})



module.exports = {createOrder,getAllUserOrder,updateOrder,deleteOrder}















 

