const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/climbing_app_db', { logging: false });

module.exports = { Sequelize, conn };
