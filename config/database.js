import {Sequelize} from "sequelize";

const database = process.env.NODE_ENV ? 'test-history-map' : 'history-map';
const host = process.env.NODE_ENV ? '0.0.0.0' : 'postgres';
export const db = new Sequelize(database, 'map', 'map', {
    dialect: "postgres",
    host,
    define: {
        timestamps: false,
        raw: true
    },
    query: {
        raw: true
    }
})