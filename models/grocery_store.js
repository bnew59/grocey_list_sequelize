'use strict';
module.exports = (sequelize, DataTypes) => {
  const grocery_store = sequelize.define('grocery_store', {
    store: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  grocery_store.associate = function(models) {
    // associations can be defined here
    grocery_store.hasMany(models.grocery_item, { foreignKey: 'store', as: 'items'})
  };
  return grocery_store;
};