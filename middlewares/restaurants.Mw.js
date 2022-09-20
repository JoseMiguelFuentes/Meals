
//models
const { Eatery } = require("../models/restaurantM")
const { Review } = require("../models/reviewM")

//utils
const { catchAsync } = require('../util/catchAsyncUtil')
const { appError } = require('../util/appError.util')

const checkEatery = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const eatery = await Eatery.findOne(id)
    if (!eatery) {
        return next(new appError(`Restaurant with id ${id} does not exist in this server.`,404))
      }
    if (eatery.status !== 'active') {
        return next(new appError(`Restaurant with id ${id} is not active right now.`,403))
      }
      req.eatery = eatery
})

const checkReview = async(req,res,next)=>{
try {
  const {id} = req.params
  const review = await Review.findByPk(id)
  if (!review) {
    return res.status(404).json({
    status: 'error',
    mesaage: `Review with id ${id} does not exist in this server.`
  })
  }
  next()
} catch (error) {
  console.log(error)
  }
  req.review = review
}

const checkReviewOwner = async(req,res,next)=>{
  try {
    const {review, sessionUser} = req
    if (sessionUser.id !== review.userId) {
      return res.status(403).json({
				status: 'error',
				message: `The review ${review.id} does not belong to you.`,
			})
    }
    next()
  } catch (error) {
    console.log(error)
    }
  }


  

  



module.exports = {
  checkEatery,
  checkReview,
  checkReviewOwner
}