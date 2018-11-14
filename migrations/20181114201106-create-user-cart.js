'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER,
        
      },
      item: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grocery_items',
          key: 'id'
        },
      },
      aisle: {
        type: Sequelize.INTEGER,
        references: {
          model: 'aisles',
          key: 'id'
        },
      },
      store: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grocery_stores',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_carts');
  }
};