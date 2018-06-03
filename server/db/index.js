const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');

const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({ username: 'Moe', password: 'MOE' }),
        User.create({ username: 'Larry', password: 'LARRY' }),
        User.create({ username: 'Curly', password: 'CURLY' }),
        User.create({ username: 'test' }),
        User.create({ username: 'test' })
      ])
    })
    .then(users => {
      const id = users[0].id;
      users.forEach(user => {
        user.addFriend(users[0]);
      });
    });
};

/* Friends */
User.belongsToMany(User, { as: 'friends', through: 'friend' });

/* Participants */
User.belongsToMany(Plan, { through: 'participants' });
Plan.belongsToMany(User, { through: 'participants' });

/* Recommendations */
User.hasMany(Place);
User.belongsToMany(Plan, { through: 'recommendations' });
Plan.belongsToMany(User, { through: 'recommendations' });

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
