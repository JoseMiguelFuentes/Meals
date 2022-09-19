const express = require('express')
const { getAllEateries, createEatery, getOneEatery, updateEatery, deleteEatery, createReview, updateReview, deleteReview } = require('../controllers/restaurants.controller')
const { protectSession, checkUserRole } = require('../middlewares/authMw')
const { checkEatery, checkReview, checkReviewOwner } = require('../middlewares/restaurants.Mw')

const eateryRouter = express.Router()

eateryRouter.get('/', getAllEateries )
eateryRouter.get('/:id',checkEatery,getOneEatery)



// Protecting below endpoints
usersRouter.use(protectSession)

eateryRouter.post('/', createEatery)

eateryRouter.patch('/:id',checkUserRole,checkEatery,updateEatery)
//Delete restaurant, better yet, put status to disable
eateryRouter.delete('/:id', checkUserRole,checkEatery,deleteEatery)
//Create reviews
eateryRouter.post('/reviews/:id',checkEatery, createReview)
//Update review by id
eateryRouter.patch('/reviews/:id',checkReview,checkReviewOwner,updateReview)
//Delete review by id
eateryRouter.delete('/reviews/:id',checkReview,checkReviewOwner,deleteReview)
















module.exports = {eateryRouter}




