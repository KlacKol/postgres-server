import Sequelize from 'sequelize'

import {db} from "../../config/database";

export const UserSchema = db.define('users', {
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
    }
})
