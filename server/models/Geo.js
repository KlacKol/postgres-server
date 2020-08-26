import Sequelize from 'sequelize';

import {db} from "../../config/database";

export const MapSchema = db.define('Map', {
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
})
