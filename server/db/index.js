const { conn } = require('./conn');
const User = require('./models/User');
const Gym = require('./models/Gym');

User.belongsTo(Gym)

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ username: 'jeremy', password: 'jeremy' }),
        User.create({ username: 'supattra', password: 'supattra' }),
        Gym.create({ name: 'Cliffs LIC' }),
        Gym.create({ name: 'Brooklyn Boulders' })
      ])
    })
}

module.exports = {
  syncAndSeed,
  models: {
    User,
    Gym
  }
}
