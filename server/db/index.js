const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Group = require('./Group');

Place.belongsTo(Plan);
Plan.hasMany(Place);
User.belongsTo(Group);
Group.hasMany(User);

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
    User,
    Group,
    Plan,
    Place
  }
};
