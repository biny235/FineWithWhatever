const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');
const Recommendation = require('./Recommendation');

const sync = () => {
  return conn.sync({ force: true })
}


/* Friends */
User.belongsToMany(User, { as: 'friends', through: 'friend' });

Plan.belongsTo(User);
User.hasMany(Plan);


/* Recommendations */
Place.belongsToMany(Plan, { through: Recommendation });
Plan.belongsToMany(Place, { through: Recommendation });
Recommendation.belongsTo(User);

/* Favorites */
User.belongsToMany(Place, { through: Favorite });
Place.belongsToMany(User, { through: Favorite });

module.exports = {
  conn,
  models: {
    User,
    Favorite,
    Plan,
    Place,
    Recommendation
  }
};
