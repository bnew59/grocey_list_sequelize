'use strict';
module.exports = (sequelize, DataTypes) => {
  const aisle = sequelize.define('aisle', {
    number: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER
  }, {});
  aisle.associate = function(models) {
    // associations can be defined here
    aisle.belongsTo(models.grocery_store, {'foreignKey': 'id', as: 'theAisle' })
  };
  return aisle;
};