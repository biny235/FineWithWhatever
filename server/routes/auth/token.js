const router = require('express').Router();
const db = require('../../db');
const { User } = db.models;

//User auth routes
router.post('/', (req, res, next) => {
  console.log(req.body)
  User.authenticate(req.body)
    .then(token => {
      console.log(token)
      res.send(token)})
    .catch(next);
});

module.exports = router;
