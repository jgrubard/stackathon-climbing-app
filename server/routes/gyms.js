const app = require('express').Router();
module.exports = app;
const Gym = require('../db').models;

app.get('/', (req, res, next) => {
  Gym.findAll()
    .then(gyms => res.send(gyms))
    .catch(next);
});
