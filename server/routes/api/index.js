const router = require('express').Router();

//routes to individual apis
router.use('/user', require('./user'));
router.use('/plans', require('./plans'));
router.use('/places', require('./places'));


module.exports = router;
