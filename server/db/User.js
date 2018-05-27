const conn = require('./conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  }
});

module.exports = User;
