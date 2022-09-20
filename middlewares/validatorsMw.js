const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map(err => err.msg)

		const message = errorMessages.join('. ')

		return res.status(400).json({
			status: 'error',
			message,
		});
	}

	next()
};

const createUserValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 6, max:6 })
		.withMessage('Password must be  6 characters'),
	checkValidations,
]
const mealValidator =[
	body('name')
	.isString()
	.withMessage('Name must be a string')
	.notEmpty()
	.withMessage('Name can not be empty')
	.isLength({ min: 3 })
	.withMessage('Name must be at least 3 characters'),
	body('price')
	.isNumeric()
	.withMessage('Price must be a number')
	.notEmpty()
	.withMessage('Price can not be empty')
]



module.exports = { createUserValidators, mealValidator }


