const { conn, Sequelize } = require('../conn');

const Request = conn.define('request', {
  declined: {
    type: Sequelize.BOOLEAN,
    defaultValue: null
  },
  date: {
    type: Sequelize.STRING
  }
}, { timestamps: false })

module.exports = Request;
