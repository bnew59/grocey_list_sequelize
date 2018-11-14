'use strict';
module.exports = (sequelize, DataTypes) => {
  const grocery_item = sequelize.define('grocery_item', {
    store: DataTypes.INTEGER,
    item: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    aisle_number: DataTypes.INTEGER
  }, {});
  grocery_item.associate = function(models) {
    // associations can be defined here
                                  
    //grocery_item.hasMany(models.user_cart, { foriegnKey: { name: 'item'} })
    

    
  };
  return grocery_item;
};