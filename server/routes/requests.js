const app = require('express').Router();
const { Request } = require('../db').models;
module.exports = app;

app.get('/', (req, res, next) => {
  Request.findAll()
    .then(requests => res.send(requests))
    .catch(next);
});

app.post('/', (req, res, next) => {
  console.log('**req.body**:', req.body)
  Request.create(req.body)
    .then(request => res.send(request))
    .catch(next);
})
