const { conn, Sequelize } = require('../conn');

const Gym = conn.define('gyms', {
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Gym;
