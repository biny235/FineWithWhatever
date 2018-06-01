const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use('/dist', express.static(path.join(__dirname, '../node_modules')));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.use((err, req, res, next) => {
  const message = err.errors && err.errors[0].message
  err.message = message || err.message
  res.status(err.status || 500).send(err.message || 'Something went wrong.')
});

module.exports = app;
