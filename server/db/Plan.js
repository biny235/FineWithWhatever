const conn = require('./conn');
const { Sequelize } = conn;

const Plan = conn.define('plan', {
  name: {
    type: Sequelize.STRING,
    defaultValue: "Plan"
  },
  date: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lng: {
    type: Sequelize.FLOAT
  },
  city: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "NEW"
  },
  category: {
    type: Sequelize.STRING,
  }
});

module.exports = Plan;
