const express = require('express');
const app = express();
const db = require('./db');
const { User } = db.models;

db.syncAndSeed()

app.get('/', (req, res, next)=>{

  res.send("HELLO")

})

module.exports = app;