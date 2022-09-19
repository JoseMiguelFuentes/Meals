const { data, DataTypes } = require('../util/database.util')

const Restaurant = data.define('restaurant', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  adress:{
    type: DataTypes.STRING,
    allowNull:false
  },
  rating:{
    type: DataTypes.INTEGER,//Between 1 & 5
  },
  status:{
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
})
module.exports = { Restaurant }