const { conn, Sequelize } = require('../conn');

const Gym = conn.define('gyms', {
  name: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});

module.exports = Gym;
