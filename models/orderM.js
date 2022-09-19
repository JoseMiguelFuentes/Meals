const { data, DataTypes } = require('../util/database.util')

const Order = data.define('orders', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mealId:{
    type: DataTypes.INTEGER,
  },
  userId:{
    type: DataTypes.INTEGER,
  },
  totalPrice:{
    type: DataTypes.INTEGER,
  },
  quantity:{
    type: DataTypes.INTEGER,
  },
  status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',//cancelled, completed
	}
})
module.exports = { Order }