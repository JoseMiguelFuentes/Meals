const { Meal } = require('./mealM')
const { Order } = require('./orderM')
const {Eatery} = require('./restaurantM')
const { Review } = require('./reviewM')
const { User } = require('./userM')

const initModels = ()=>{
  //* 1 Restaurant to many reviews
  Eatery.hasMany( Review, {foreignKey:'restaurantId'} )
  Review.belongsTo(Eatery)
 //* 1 Restaurant to many meal 
  Eatery.hasMany( Meal, {foreignKey:'restaurantId'} )
  Meal.belongsTo(Eatery)
  //* 1 Meal to 1 order
  Meal.hasOne( Order, {foreignKey:'mealId'} )
  Order.belongsTo(Meal)
  //* 1 User  to many orders 
  User.hasMany( Order, {foreignKey:'userId'} )
  Order.belongsTo(User)
  //* 1 User  to many reviews 
  User.hasMany( Review, {foreignKey:'userId'} )
  Review.belongsTo(User)




}
module.exports = { initModels }