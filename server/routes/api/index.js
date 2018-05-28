const router = require('express').Router()

//routes to individual apis
router.use('/users', require('./users'));


module.exports = router;
