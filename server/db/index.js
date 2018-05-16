const { conn } = require('./conn');
const User = require('./models/User');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ name: 'Jeremy' })
      ])
    })
}

module.exports = {
  syncAndSeed,
  models: {
    User
  }
}
