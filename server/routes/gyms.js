const app = require('express').Router();
const { Gym } = require('../db').models;
module.exports = app;

app.get('/', (req, res, next) => {
  Gym.findAll()
    .then(gyms => res.send(gyms))
    .catch(next);
});
