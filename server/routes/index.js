const router = require('express').Router();
const db = require('../db');
const { User } = db.models;

router.use((req, res, next) => {
  const token = req.headers.authorization;

  if(!token) {
    return next();
  }
  User.exchangeTokenForUser(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => next({ status: 401 }));
});

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

module.exports = router;
