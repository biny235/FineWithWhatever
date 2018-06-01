const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/token', require('./token'));

module.exports = router;
