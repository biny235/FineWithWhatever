const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Group = require('./Group');



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
        user.addFriend(users[0]);
      });
    });
};

Place.belongsTo(Plan);
Plan.hasMany(Place);
User.belongsToMany(User, { as: 'friend', through: 'friends' });
User.belongsToMany(Group, { as: 'member', through: 'groupmembers' });
Group.belongsToMany(User, { as: 'group', through: 'groupmembers'})

module.exports = {
  syncAndSeed,
  models:{
    User,
    Group,
    Plan,
    Place
  }
};
