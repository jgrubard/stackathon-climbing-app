const { conn, Sequelize } = require('../conn');

const Request = conn.define('request', {}, { timestamps: false })

module.exports = Request;
