const { conn } = require('./conn');
const User = require('./models/User');
const Gym = require('./models/Gym');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'Jeremy' }),
        User.create({ name: 'Supattra' }),
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
