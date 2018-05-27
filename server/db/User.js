const conn = require('./conn');
const { Sequelize } = conn;

const User = conn.define('user', {
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
})

module.exports = User;