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
  }
}, {
  timestamps: false
});

module.exports = User;
