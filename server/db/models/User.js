const { Sequelize, conn } = require('../conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = User;
