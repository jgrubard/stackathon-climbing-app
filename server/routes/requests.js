const app = require('express').Router();
const { Request } = require('../db').models;
module.exports = app;

app.get('/', (req, res, next) => {
  Request.findAll()
    .then(requests => res.send(requests))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Request.create(req.body)
    .then(request => res.send(request))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  Request.findById(req.params.id)
    .then(request => {
      Object.assign(request, req.body)
      return request.save();
    })
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Request.findById(req.params.id)
    .then(request => request.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
