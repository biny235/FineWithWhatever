const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');



const syncAndSeed = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
<<<<<<< HEAD
        User.create({username: 'Moe', password: 'MOE'}),
        User.create({username: 'Larry', password: 'LARRY'}),
        User.create({username: 'Curly', password: 'CURLY'}),
        User.create({username: 'test', password: '123'}),
=======
        User.create({ username: 'Moe', password: 'MOE' }),
        User.create({ username: 'Larry', password: 'LARRY' }),
        User.create({ username: 'Curly', password: 'CURLY' }),
        User.create({ username: 'test' }),
        User.create({ username: 'test' })
>>>>>>> master
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
<<<<<<< HEAD
Plan.belongsTo(User);
User.hasMany(Plan);
Place.belongsToMany(Plan, { as: 'recommendation', through: 'recommendations' });
Place.belongsToMany(User, {as: 'favorites', through: 'user_favorites'})
=======

/* Participants */
User.belongsToMany(Plan, { through: 'participants' });
Plan.belongsToMany(User, { through: 'participants' });

/* Recommendations */
Plan.belongsToMany(Place, { through: 'recommendations' });
Place.belongsToMany(Plan, { through: 'recommendations' });

// User.belongsToMany(Plan, { through: 'recommendations' });
// User.belongsToMany(Place, { through: 'recommendations' });

/* Favorites */
User.belongsToMany(Place, { through: Favorite });
Place.belongsToMany(User, { through: Favorite });
>>>>>>> master

module.exports = {
  syncAndSeed,
  models: {
    User,
    Plan,
    Place
  }
};
