const conn = require('./conn');
const { Sequelize } = conn;

const Plan = conn.define('plan', {
  name: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  }
});

module.exports = Plan;
