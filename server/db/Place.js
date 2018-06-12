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
  // url: {  //BUGGY
  //   type: Sequelize.STRING
  // },
  place_id: {
    type: Sequelize.INTEGER
  },
  details: {
    type: Sequelize.TEXT
  }
});

module.exports = Place;

Place.findOrCreatePlace = function(place) {
  return Place.findOrCreate({
    where: { place_id: place.place_id},
    defaults: {
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      place_id: place.place_id
    }
  });
};
