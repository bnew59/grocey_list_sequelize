'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_cart = sequelize.define('user_cart', {
    user: DataTypes.INTEGER,
    item: DataTypes.INTEGER,
    aisle: DataTypes.INTEGER,
    store: DataTypes.INTEGER
  }, {});
  user_cart.associate = function(models) {
    // associations can be defined here
    //user_cart.belongsTo(models.grocery_item, { foreignKey: { name: 'id'} , as: 'user_selection'})
  
    user_cart.hasOne(models.aisle, {foreignKey: { name: 'id'}, as: 'theAisle'})
    user_cart.hasOne(models.grocery_item, {foreignKey: { name: 'id'}, as: 'theItem'})

  };
  return user_cart;
};