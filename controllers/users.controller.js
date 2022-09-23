const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/userM')
const { Order } = require('../models/orderM')
const { Eatery } = require('../models/restaurantM')
const { catchAsync } = require('../util/catchAsyncUtil')
const { appError } = require('../util/appError.util')
const {Meal} = require('../models/mealM')

dotenv.config({ path: './config.env' })


//*Signup.
const createUser = catchAsync(async(req, res,next) => {
		const { name, email, password} = req.body
		// Encrypt the password
		const salt = await bcrypt.genSalt(12)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword
		})
		// Remove password from response
		newUser.password = undefined
		// 201 -> Success and a resource has been created
		res.status(201).json({
			status: 'success',
			data: { newUser },
		})
})
//*Updating name and email.
const updateUser = catchAsync(async(req, res,next) => {
		const { name, email } = req.body
		const { user } = req
		await user.update({ name, email })
		user.password = undefined
		res.status(200).json({
			status: 'success',
			data: { user },
		})
})

//*Turning user status to deleted.
const deleteUser = catchAsync(async(req, res,next) => {
		const { user } = req
		await user.update({ status: 'deleted' })
		res.status(204).json({ status: 'success' })
})
//*Login.
const login = catchAsync(async(req, res,next) => {
		// Get email and password from req.body
		const { email, password } = req.body
		// Validate if the user exist with given email
		const user = await User.findOne({
			where: { email }, status: 'active'
		})
		// Compare passwords (entered password vs db password)
		// If user doesn't exists or passwords doesn't match, send error
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return next(new appError('Wrong credentials',400))
		}
		// Remove password from response
		user.password = undefined
		// Generate JWT (payload, secretOrPrivateKey, options)
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '30d',
		})
		res.status(200).json({
			status: 'success',
			data: { user, token },
		})
})
//*Getting Orders from user.
const getUserOrders = catchAsync(async(req, res,next)=>{
		const {id} = req.sessionUser
		const orders = await Order.findAll({where: {userId:id},include:{model:Meal, include:{model:Eatery}}})
		res.status(200).json({
			status:'success',
			data:{orders}
		})
})
//*Get the order requested.
const getOrderById = catchAsync(async(req, res,next) =>{
		const {id} = req.order
		const order = await Order.findByPk({id,include:{model:Meal}})
		res.status(200).json({
			status:'success',
			data:{order}
		})
})

module.exports = {
	createUser,
	updateUser,
	deleteUser,
	login,
	getUserOrders,
	getOrderById
}
