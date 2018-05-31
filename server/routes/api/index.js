const router = require('express').Router();

//routes to individual apis
router.use('/user', require('./user'));

module.exports = router;
