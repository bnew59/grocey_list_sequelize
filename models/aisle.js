'use strict';
module.exports = (sequelize, DataTypes) => {
  const aisle = sequelize.define('aisle', {
    store_id: DataTypes.INTEGER,
    aisle_category: DataTypes.STRING,
  }, {});
  aisle.associate = function(models) {
    // associations can be defined here
    // aisle.belongsTo(models.grocery_store, { foreignKey: 'id', as: 'theStore' })
    // aisle.hasMany(models.grocery_item, { foreignKey: 'aisle_number', as: 'items'})
  };
  return aisle;
};