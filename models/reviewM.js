const { data, DataTypes } = require('../util/database.util')

const Review = data.define('reviews', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId:{
    type: DataTypes.INTEGER,
  },
  comment:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId:{
    type: DataTypes.INTEGER,
  },
  rating:{
    type: DataTypes.INTEGER,//Between 1 & 5
  }
})
module.exports = { Review }