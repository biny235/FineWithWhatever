const conn = require('./conn');
const { Sequelize } = conn;

const Favorite = conn.define('favorites', {
  ratings: {
    type: Sequelize.INTEGER
  }
});

module.exports = Favorite;
