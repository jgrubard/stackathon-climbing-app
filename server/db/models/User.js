const { Sequelize, conn } = require('../conn');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.TEXT
  },
  boulder: {
    type: Sequelize.STRING
  },
  top: {
    type: Sequelize.STRING
  },
  lead: {
    type: Sequelize.STRING
  },

}, {
  timestamps: false
});

module.exports = User;
