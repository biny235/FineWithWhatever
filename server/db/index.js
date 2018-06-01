const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');



const syncAndSeed = ()=>{
  return conn.sync({ force: true })
    .then(()=>{
      return Promise.all([
        User.create({username: 'Moe', password: 'MOE'}),
        User.create({username: 'Larry', password: 'LARRY'}),
        User.create({username: 'Curly', password: 'CURLY'}),
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

User.belongsToMany(User, { as: 'friends', through: 'friend' });
Plan.belongsTo(User);
User.hasMany(Plan);
Place.belongsToMany(Plan, { as: 'recommendations', through: 'plan_places' });
Place.belongsToMany(User, {as: 'favorites', through: 'user_favorites'})
Favorite.belongsTo(User);
Favorite.belongsTo(Place);
User.hasMany(Favorite);

module.exports = {
  syncAndSeed,
  models:{
    User,
    Favorite,
    Plan,
    Place
  }
};
