import {Sequelize} from "sequelize";

export const db = new Sequelize('history-map', 'map', 'map', {
    dialect: "postgres",
    host: 'postgres',
    define: {
        timestamps: false,
        raw: true
    },
    query: {
        raw: true
    }
})