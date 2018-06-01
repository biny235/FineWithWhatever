const router = require('express').Router();

router.use('/google', require('./google'));
router.use('/', require('./token'));

module.exports = router;
