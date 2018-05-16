const { conn } = require('./conn');
const User = require('./models/User');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'Jeremy' }),
        User.create({ name: 'Supattra' })
      ])
    })
}

module.exports = {
  syncAndSeed,
  models: {
    User
  }
}
