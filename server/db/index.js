const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');



const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({username: 'Moe', password: 'MOE'}),
        User.create({username: 'Larry', password: 'LARRY'}),
        User.create({username: 'Curly', password: 'CURLY'}),
        User.create({username: 'test', password: '123'}),
      ])
    })
    .then(users => {
      users.forEach(user =>{
        users[0].addFriend(user);
      })
      users.forEach(user =>{
        users[1].addFriend(user);
      }) 
    });
};

/* Friends */
User.belongsToMany(User, { as: 'friends', through: 'friend' });

Plan.belongsTo(User);
User.hasMany(Plan);

/* Participants */
// User.belongsToMany(Plan, { through: 'participants' });
// Plan.belongsToMany(User, { through: 'participants' });

/* Recommendations */
Plan.belongsToMany(Place, { through: 'recommendations' });
Place.belongsToMany(Plan, { through: 'recommendations' });

// User.belongsToMany(Plan, { through: 'recommendations' });
// User.belongsToMany(Place, { through: 'recommendations' });

/* Favorites */
User.belongsToMany(Place, { through: Favorite });
Place.belongsToMany(User, { through: Favorite });

module.exports = {
  syncAndSeed,
  models: {
    User,
    Favorite,
    Plan,
    Place
  }
};
