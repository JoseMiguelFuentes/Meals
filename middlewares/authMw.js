const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/userM');
//Utils
const { catchAsync } = require('../util/catchAsyncUtil')
const { appError } = require('../util/appError.util')

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async(req, res, next) => {
		// Get token
		let token

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			// Extract token
			token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
		}
		// Check if the token was sent or not
		if (!token) {
			return next(new appError('You are not logged',403))
		}
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		// Verify the token's owner
		const user = await User.findOne({
			where: { id: decoded.id, status: 'active' },
		})

		if (!user) {
			return next(new appError('The owner of the session is no longer active',403))
		}
		// Grant access
		req.sessionUser = user
})

//*Check the sessionUser to compare to the one that wants to be updated/deleted
const protectUsersAccount = catchAsync(async(req, res, next) => { 
	const { sessionUser, user } = req
	// If the users (ids) don't match, send an error, otherwise continue
	if (sessionUser.id !== user.id) {
		return next( new appError('You are not the owner of this account.',403))
	}
})

// Create middleware to protect posts, only owners should be able to update/delete

const protectPostsOwners = catchAsync(async(req, res, next) => {
	const { sessionUser, post } = req

	if (sessionUser.id !== post.userId) {
		return next(new appError('This post does not belong to you.',403))
	}
})

// Create middleware to protect comments, only owners should be able to update/delete
const protectCommentsOwners = catchAsync(async(req, res, next) => {
	const { sessionUser, comment } = req

	if (sessionUser.id !== comment.userId) {
		return next(new appError('This comment does not belong to you.',403))
	}
})

//*Create middleware that only grants access to admin users
const checkUserRole = catchAsync(async(req, res, next) => {
	const { sessionUser } = req
//*Check user's Role
	if (sessionUser.role !== 'admin') {
		return next(new appError('You do not have the access level for this action.',403))
	}
})

//*Checking if order belong.
const protectUsersOrders = catchAsync(async(req, res, next) => {
		const {order, sessionUser} = req
		if (order.UserId !== sessionUser.id) {
			return next(new appError(`The order (${order.id}) does not belong to you.`,403))
		}
})



module.exports = {
	protectSession,
	protectUsersAccount,
	checkUserRole,
	protectUsersOrders,
	protectPostsOwners
}

