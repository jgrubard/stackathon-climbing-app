const { conn } = require('./conn');
const User = require('./models/User');
const Gym = require('./models/Gym');
const Request = require('./models/Request')

User.belongsTo(Gym)
// User.belongsToMany(User, { as: 'partner', through: Request })
Request.belongsTo(User, { as: 'user'});
Request.belongsTo(User, { as: 'partner'});
Request.belongsTo(Gym);

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ username: 'jeremy', password: 'jeremy' }),
        User.create({ username: 'supattra', password: 'supattra' }),
        User.create({ username: 'sam', password: 'sam' }),
        User.create({ username: 'emily', password: 'emily' }),
        Gym.create({ name: 'Cliffs LIC' }),
        Gym.create({ name: 'Brooklyn Boulders' })
      ])
    })
    .then(([ jeremy, supattra, sam, emily, cliffs, bkb]) => {
      supattra.setGym(cliffs)
      sam.setGym(cliffs)
      emily.setGym(cliffs)
    })
}

module.exports = {
  syncAndSeed,
  models: {
    User,
    Gym,
    Request
  }
}
