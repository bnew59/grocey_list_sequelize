'use strict';
module.exports = (sequelize, DataTypes) => {
  const grocery_item = sequelize.define('grocery_item', {
    store: DataTypes.INTEGER,
    item: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    aisle_id: DataTypes.INTEGER
  }, {});
  grocery_item.associate = function(models) {
    // associations can be defined here
    grocery_item.belongsTo(models.grocery_store, { foreignKey: 'id', as: 'theStore'})
  };
  return grocery_item;
};