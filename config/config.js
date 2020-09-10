require('dotenv').config();

module.exports = {
  development: {
    username: "map",
    password: "map",
    database: process.env.DEV_DATABASE,
    host: '0.0.0.0',
    dialect: 'postgres',
    define: {
      timestamp: false,
      raw: true
    },
    query: {
      raw: true
    }
  },
  test: {
    username: "map",
    password: "map",
    database: process.env.TEST_DATABASE,
    host: '0.0.0.0',
    dialect: 'postgres',
    define: {
      timestamp: false,
      raw: true
    },
    query: {
      raw: true
    }
  },
  production: {
    username: "map",
    password: "map",
    database: process.env.DEV_DATABASE,
    host: '0.0.0.0',
    dialect: 'postgres',
    define: {
      timestamp: false,
      raw: true
    },
    query: {
      raw: true
    }
  },
}

