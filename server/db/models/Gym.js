const { conn } = '../conn';

const Gym = conn.define('gyms', {
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Gym;
