const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');

const sync = () => {
  return conn.sync({ force: true })
}

/* Friends */
User.belongsToMany(User, { as: 'friends', through: 'friend' });

Plan.belongsTo(User);
User.hasMany(Plan);

/* Participants */
// User.belongsToMany(Plan, { through: 'participants' });
// Plan.belongsToMany(User, { through: 'participants' });

/* Recommendations */
User.hasMany(Place);
User.belongsToMany(Plan, { through: 'recommendations' });
Plan.belongsToMany(User, { through: 'recommendations' });

/* Favorites */
User.belongsToMany(Place, { through: Favorite });
Place.belongsToMany(User, { through: Favorite });

module.exports = {
  conn,
  sync,
  models: {
    User,
    Favorite,
    Plan,
    Place
  }
};
