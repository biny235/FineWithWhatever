const router = require('express').Router();
const { User } = require('../../db').models;
const { auth } = require('./authFuncs');

router.get('/', (req, res, next)=> {
  User.exchangeTokenForUser(req.params.token)
    .then(user => res.send(user))
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      const credentials = { username: user.username, password: user.password };
      return User.authenticate(credentials);
    })
    .then(token => res.send(token));
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(req.body);
      res.send(user);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
