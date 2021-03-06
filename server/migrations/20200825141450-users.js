'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: [3, 20]
        }
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      avatar: {
        type: Sequelize.STRING,
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users')
  }
};
