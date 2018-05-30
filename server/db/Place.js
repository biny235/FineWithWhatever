const conn = require('./conn');
const { Sequelize } = conn;

const Place = conn.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.TEXT
  }
});

module.exports = Place;
