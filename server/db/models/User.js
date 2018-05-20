const { Sequelize, conn } = require('../conn');

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
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
  location: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  getterMethods: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`
    }
  }
});

module.exports = User;
