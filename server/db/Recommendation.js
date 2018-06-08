
const conn = require('./conn');
const { Sequelize } = conn;

const Recommendation = conn.define('recommendations', {
  comment: {
    type: Sequelize.TEXT
  }
});

module.exports = Recommendation;
