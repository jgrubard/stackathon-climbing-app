const app = require('express').Router();
const { User } = require('../db').models;
module.exports = app;

app.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.send(user))
    .catch(next);
});
