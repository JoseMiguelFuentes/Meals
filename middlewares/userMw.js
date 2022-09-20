// Models
const { Order } = require('../models/orderM');
const { User } = require('../models/userM');

const userExists = async (req, res, next) => {
	try {
		const { id } = req.params

		const user = await User.findOne({
			attributes: { exclude: ['password'] },
			where: { id },
		});

		// If user doesn't exist, send error message
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'User not found',
			})
		}

		// req.anyPropName = 'anyValue'
		req.user = user
		next()
	} catch (error) {
		console.log(error)
	}
}

const orderExists = async(req,res,next)=>{
	try {
		const {id} = req.params 
		const order = await Order.findByPk(id)
		if (!order) {
			return res.status(404).json({
				status:'error',
				message: `Order with id ${id} doesn't exist in our server.`
			})
		}
		req.order = order
		next()
	} catch (error) {
		console.log(error)
	}
}



module.exports = {
	userExists,
	orderExists
}
