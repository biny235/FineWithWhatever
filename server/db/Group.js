const conn = require('./conn');
const { Sequelize } = conn;

const Group = conn.define('group', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Group'
  }
});

module.exports = Group;
