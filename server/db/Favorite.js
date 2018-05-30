const conn = require('./conn');
const { Sequelize } = conn;

const Favorite = conn.define('favorite', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Favorite;
