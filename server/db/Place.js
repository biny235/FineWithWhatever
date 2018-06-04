const conn = require('./conn');
const { Sequelize } = conn;

const Place = conn.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.STRING
  },
  lng: {
    type: Sequelize.STRING
  },
  place_id: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.TEXT
  }
});

module.exports = Place;
