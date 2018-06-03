const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');



const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(()=>{
      return Promise.all([
        User.create({username: 'Moe', password: 'MOE'}),
        User.create({username: 'Larry', password: 'LARRY'}),
        User.create({username: 'Curly', password: 'CURLY'}),
        User.create({username: 'test', password: '123'}),
      ])
    })
    .then(users => {
      const id =  users[0].id;
      users.forEach(user => {
        user.addFriend(users[0]);
      });
    });
};

User.belongsToMany(User, { as: 'friends', through: 'friend' });
Plan.belongsTo(User);
User.hasMany(Plan);
Place.belongsToMany(Plan, { as: 'recommendation', through: 'recommendations' });
Place.belongsToMany(User, {as: 'favorites', through: 'user_favorites'})

module.exports = {
  syncAndSeed,
  models:{
    User,
    Plan,
    Place
  }
};
