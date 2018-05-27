const conn = require('./conn');
const User = require('./User');


const syncAndSeed = ()=>{
  return conn.sync({ force: true })
}

module.exports = {
  syncAndSeed,
  models:{
    User
  }
}