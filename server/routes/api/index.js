const router = require('express').Router();

//routes to individual apis
router.use('/user', require('./user'));
router.use('/user/plan', require('./plans'));
router.use('/places', require('./places'));


module.exports = router;
