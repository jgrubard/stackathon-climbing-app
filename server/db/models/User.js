const { Sequelize, conn } = require('../conn');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});

module.exports = User;
