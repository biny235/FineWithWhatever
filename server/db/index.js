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
  return conn.sync({ force: true });
};

module.exports = {
  syncAndSeed,
  models:{
    User,
    Group,
    Plan,
    Place
  }
};
