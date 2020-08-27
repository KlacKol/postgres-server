import Sequelize from 'sequelize';

import {db} from "../../config/database";

export const MapSchema = db.define('maps', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    location: {
        type: Sequelize.GEOGRAPHY('POINT')
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
})
