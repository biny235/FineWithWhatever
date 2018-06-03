const router = require('express').Router();
// const db = require('../db');
//const { User } = db.models;

router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

module.exports = router;
