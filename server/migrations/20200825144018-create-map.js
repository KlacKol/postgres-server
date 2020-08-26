'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Maps', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,
        validate: {
          min: -90,
          max: 90
        }
      },
      lng: {
        type: Sequelize.FLOAT,
        validate: {
          min: -180,
          max: 180
        }
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
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Maps');
  }
};