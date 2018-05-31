const router = require('express').Router();
const db = require('../../db');
const { User } = db.models;

router.use((req, res, next) => {
  const token = req.headers.token;
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

router.use('/google', require('./google'));
router.use('/token', require('./token'));

module.exports = router;
