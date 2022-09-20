const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
	getUserOrders,
	getOrderById,
} = require('../controllers/users.controller');

// Middlewares
const { userExists, orderExists } = require('../middlewares/userMw')
const {
	protectSession,
	protectUsersAccount,
	checkUserRole,
	protectUsersOrders,
} = require('../middlewares/authMw')
const {
	createUserValidators,
} = require('../middlewares/validatorsMw')

const userRouter = express.Router()

userRouter.post('/signup', createUserValidators, createUser)

userRouter.post('/login', login)

// Protecting below endpoints
userRouter.use(protectSession)

userRouter.get('/',  getAllUsers)//protectAdmin,

userRouter.patch('/:id', userExists, protectUsersAccount, updateUser)

userRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)


userRouter.get('/orders', getUserOrders)

userRouter.get('/orders/:id',orderExists, protectUsersOrders, getOrderById)

module.exports = { userRouter }
