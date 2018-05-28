const router = require('express').Router();
const db = require('../../db');
const { User } = db.models;

//User auth routes
router.post('/login', (req, res, next) => {
  User.authenticate(req.body)
    .then(token => res.send(token))
    .catch(next);
});

router.get('/:token', (req, res, next)=> {
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

module.exports = router;
