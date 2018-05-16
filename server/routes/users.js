const app = require('express').Router();
const { User } = require('../db').models;
module.exports = app;

app.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});
