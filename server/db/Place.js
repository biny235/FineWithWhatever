const conn = require('./conn');
const { Sequelize } = conn;

const Place = conn.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  url: {
    type: Sequelize.STRING
  },
  place_id: {
    type: Sequelize.INTEGER
  },
  details: {
    type: Sequelize.TEXT
  }
});

module.exports = Place;
