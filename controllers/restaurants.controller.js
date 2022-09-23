const { Eatery } = require("../models/restaurantM")
const { Review } = require("../models/reviewM")

const { catchAsync } = require("../util/catchAsyncUtil")
const { appError } = require('../util/appError.util')


//*Create restaurant.
const createEatery =  catchAsync(async(req,res,next)=>{
  const { name, address, rating } = req.body
  const newEatery = await Eatery.create({
    name,
    address,
    rating
  })
  res.status(201).json({
    status:'success',
    data: {newEatery}
  })
})
//*Get all restaurants.
const getAllEateries = catchAsync(async(req,res,next)=>{
  const eateries = await Eatery.findAll({where: {status:'active'},include:{model:Review, where:{status:'active'}}})
  res.status(200).json({
    status:'success',
    data:{eateries} 
  })
})
//*Get just one restaurant by id.
const getOneEatery = catchAsync(async(req,res,next)=>{
    const {id} = req.eatery
    const eatery = await Eatery.findOne({where: {id},status:'active',include:{model:Review}})
    res.status(200).json({
      status:'succes',
      data:{eatery}
    })
})
//*Update restaurant properties by Admin.
const  updateEatery = catchAsync(async(req,res,next)=>{
  const {name,adress} = req.body
  const {eatery} = req
  await eatery.update({name,adress})
  res.status(200).json({
    status:'success',
    data:{eatery}
  })
})
//*Change Status of the restaurant  by Admin.
const deleteEatery = catchAsync(async(req,res,next)=>{
  const {eatery} = req
  await eatery.update({status:'disable'})
  res.status(204).json({
    status:'success'
  })
})
//*Create review to restaurant  by user.
const createReview = catchAsync(async(req,res,next)=>{
  const {comment,rating} = req.body
  const restaurantId = req.eatery.id
  const userId = req.sessionUser.id
  const newReview = await Review.create({userId,comment,restaurantId,rating})
  if (rating > 5 || rating < 1) {
    return   next(new appError('rating has to be an  integer between 1 and 5.',400))
  }
  res.status(201).json({
    status:'success',
    data:{newReview}
  })
})
//*Update review for restaurant  by owner.
const updateReview = catchAsync(async(req,res,next)=>{
  const {comment,rating} = req.body
  const {review} = req
  await review.update({comment,rating})
  if (rating > 5 || rating < 1) {
    return   next(new appError('rating has to be an  integer between 1 and 5.',400))
  }
  res.status(200).json({
    status:'success',
    data:{review}
  })
})
//*Change review status for restaurant  by owner.
const deleteReview = catchAsync(async(req,res,next)=>{
  const {review} = req
  await review.update({status:'deleted'})
  res.status(204).json({status:'success'})
})


module.exports = {
  createEatery,
  getAllEateries,
  getOneEatery,
  updateEatery,
  deleteEatery,
  createReview,
  updateReview,
  deleteReview
  }