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
  // url: {  //BUGGY
  //   type: Sequelize.STRING
  // },
  place_id: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.TEXT
  }
});

module.exports = Place;

Place.findOrCreatePlace = function(place) {
  Place.findOrCreate({
    where: { place_Id: place.place_Id},
    defaults: {
      name: place.name,
      lat: place.lat,
      lng: place.lng,
      place_id: place.place_id
    }
  });
};
