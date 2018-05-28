const router = require('express').Router();
const { User } = require('../../db').models;

//authorization middleware for headers
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

//routes to individual apis
router.use('/users', require('./users'));

module.exports = router;
