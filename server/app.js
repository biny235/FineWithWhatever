const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(volleyball);
app.use('/', require('./routes'));

app.use('/vendor', express.static(path.join(__dirname, '/node_modules')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res, next)=>{
  res.send("HELLO")
})

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

app.use((err, req, res, next) => {
  console.log(`*** There is an error! ${err.stack} ***`);
});

module.exports = app;













<<<<<<< HEAD
module.exports = app;
=======
>>>>>>> a1fcf0264dc613fbe0e215d5a187872e9b33ae74
