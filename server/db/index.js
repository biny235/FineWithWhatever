const conn = require('./conn');
const User = require('./User');


const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(()=>{
      return Promise.all([
        User.create({username: 'test'}),
        User.create({username: 'test'}),
        User.create({username: 'test'}),
        User.create({username: 'test'}),
        User.create({username: 'test'})
      ])
    })
    .then(users => {
      const id =  users[0].id;
      users.forEach(user => {
        user.addFriend(users[0])
      })
    })
}

User.belongsToMany(User, { as: 'friend', through: 'friends' })



module.exports = {
  syncAndSeed,
  models:{
    User
  }
}