const { Restaurant } = require("../models/restaurantM")
const { Review } = require("../models/reviewM")

const checkEatery = async(req,res,next)=>{
try {
    const {id} = req.params
    const eatery = await Restaurant.findByPk(id)
    if (!eatery) {
        return res.status(404).json({
        status: 'error',
        mesaage: `Restaurant with id ${id} does not exist in this server.`
      })
      req.eatery = eatery
    }
    next()
} catch (error) {
  console.log(error)
  }
}

const checkReview = async(req,res,next)=>{
try {
  const {id} = req.params
  const review = await Review.findByPk(id)
  if (!review) {
    return res.status(404).json({
    status: 'error',
    mesaage: `Review with id ${id} does not exist in this server.`
  })
  req.review = review
  }
  next()
} catch (error) {
  console.log(error)
  }
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