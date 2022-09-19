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
	protectAdmin,
	protectUsersOrders,
} = require('../middlewares/authMw')
const {
	createUserValidators,
} = require('../middlewares/validatorsMw')

const usersRouter = express.Router()

usersRouter.post('/signup', createUserValidators, createUser)

usersRouter.post('/login', login)

// Protecting below endpoints
usersRouter.use(protectSession)

usersRouter.get('/',  getAllUsers)//protectAdmin,

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser)

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)

/*

 */
usersRouter.get('/orders', getUserOrders)

usersRouter.get('/orders/:id',orderExists, protectUsersOrders, getOrderById)

module.exports = { usersRouter }
