'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maps', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      location: {
        type: Sequelize.GEOMETRY('POINT', 4326)
      },
      description: {
        type: Sequelize.STRING,
        validate: {
          len: [20, 100]
        }
      },
      date: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('maps');
  }
};