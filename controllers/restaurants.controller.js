const { Restaurant } = require("../models/restaurantM")
const { Review } = require("../models/reviewM")



const createEatery = async(req,res)=>{
try {
  const { name, adress, rating } = req.body
  const newEatery = await Restaurant.create({
    name,
    adress,
    rating
  })
  res.status(200).json({
    status:'success',
    data: {newEatery}
  })
} catch (error) {
  console.log(error)
  }
}

const getAllEateries = async(req,res)=>{
try {
  const {id} = req.params
  const eateries = await Restaurant.findAll({where: {status:'active'}})
  res.status(200).json({
    status:'success',
    data:{eateries}
  })
} catch (error) {
  console.log(error)
  }
}
const getOneEatery = async(req,res)=>{
  try {
    const {eatery} = req
    res.status(200).json({
      status:'succes',
      data:{eatery}
    })
  } catch (error) {
    console.log(error)
    }
}
const  updateEatery = async(req,res)=>{
try {
  const {name,adress} = req.body
  const {eatery} = req
  await eatery.update({name,adress})
  res.status(200).json({
    status:'success',
    data:{eatery}
  })
} catch (error) {
  console.log(error)
  }
}
const deleteEatery = async(req,res)=>{
try {
  const {eatery} = req
  await eatery.update({status:'disable'})
  res.status(204).json({
    status:'success'
  })
} catch (error) {
  console.log(error)
  }
}

const createReview = async(req,res)=>{
try {
  const {comment,rating} = req.body
  const {restaurantId} = req.eatery
  const {userId} = req.sessionUser.id
  const newReview = await Review.create({userId,comment,restaurantId,rating})
  res.status(201).json({
    status:'success',
    data:{newReview}
  })
} catch (error) {
  console.log(error)
  }
}

const updateReview = async(req,res)=>{
try {
  const {comment,rating} = req.body
  const {review} = req
  await review.update({comment,rating})
  res.status(201).json({
    status:'success',
    data:{review}
  })
} catch (error) {
  console.log(error)
  }
}

const deleteReview = async(req,res,next)=>{
try {
  const {review} = req
  await review.update({status:'deleted'})
  res.status(204).json({status:'success'})
} catch (error) {
  console.log(error)
  }
}


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