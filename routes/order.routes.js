const express = require('express')


// Controllers
const { createOrder, getAllUserOrder, updateOrder, deleteOrder } = require('../controllers/orders.controller');
// Middlewares
const { protectSession } = require('../middlewares/authMw');
const { checkOrder, checkOrderOwner } = require('../middlewares/ordersMw');



const orderRouter = express.Router()

orderRouter.use(protectSession)
	orderRouter.post('/', createOrder)
	orderRouter.get('/me', getAllUserOrder)
	orderRouter.patch('/:id', checkOrder,checkOrderOwner,updateOrder)
	orderRouter.delete('/:id', checkOrder,checkOrderOwner,deleteOrder)

// Protecting below endpoints


/*


usersRouter.get('/',  getAllUsers)//protectAdmin,

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser)

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser)
 */
orderRouter.get('/orders', getAllUserOrder)

// orderRouter.get('/orders/:id',orderExists, protectUsersOrders, getOrderById)

module.exports = { orderRouter }
