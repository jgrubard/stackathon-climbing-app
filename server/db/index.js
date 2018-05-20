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
        User.create({
          username: 'jeremy',
          password: 'jeremy',
          boulder: 'V6',
          top: '5.11',
          lead: '5.10'
        }),
        User.create({
          username: 'supattra',
          password: 'supattra',
          boulder: 'V5',
          top: '5.12',
          lead: '5.11'
        }),
        User.create({
          username: 'sam',
          password: 'sam',
          boulder: 'V6',
          top: '5.11',
          lead: '5.9'
        }),
        User.create({
          username: 'emily',
          password: 'emily',
          boulder: 'V4',
          top: '5.11',
          lead: '5.9'
        }),
        Gym.create({
          name: 'The Cliffs LIC',
          street: '11-11 44th Drive',
          city: 'Long Island City',
          state: 'NY',
          zip: '11101'
        }),
        Gym.create({
          name: 'Brooklyn Boulders',
          street: '575 Degraw Street',
          city: 'Brooklyn',
          state: 'NY',
          zip: '11217'
        })
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
