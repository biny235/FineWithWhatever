const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const Plan = require('./Plan');
const Favorite = require('./Favorite');
const Recommendation = require('./Recommendation');
const axios = require('axios');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  axios.get('https://randomuser.me/api/?results=50')
    .then(res => res.data.results)
    .then(results => {
      return Promise.all(results.map(result => {
        return User.create({
          username: `${result.name.first} ${result.name.last}`,
          password: result.login.password,
          googleId: result.login.username,
          email: result.email,
          thumbnail: result.picture.thumbnail
        })
      }))
    })
    .then(users => {
      for (let i = 0; i < 50; i++) {
        users.forEach(user => {
          if (users[i].email !== user.email)
            users[i].addFriend(user);
        })
      }
    })
    .catch(err => console.log(err))
}

const seedSample = () => {
  return Promise.all([
    User.create({ username: 'Moe', password: 'MOE' }),
    User.create({ username: 'Larry', password: 'LARRY' }),
    User.create({ username: 'Curly', password: 'CURLY' }),
    User.create({ username: 'test', password: '123' }),
  ])
    .then(users => {
      users.forEach(user => {
        users[0].addFriend(user);
      })
      users.forEach(user => {
        users[1].addFriend(user);
      })
    });
};

/* Friends */
User.belongsToMany(User, { as: 'friends', through: 'friend' });

Plan.belongsTo(User);
User.hasMany(Plan);
Plan.hasMany(Place, {as: 'places'});

/* Participants */
// User.belongsToMany(Plan, { through: 'participants' });
// Plan.belongsToMany(User, { through: 'participants' });

/* Recommendations */
Place.belongsToMany(Plan, { through: Recommendation });
Plan.belongsToMany(Place, { through: Recommendation });
Recommendation.belongsTo(User);

/* Favorites */
User.belongsToMany(Place, { through: Favorite });
Place.belongsToMany(User, { through: Favorite });

module.exports = {
  conn,
  sync,
  seed,
  seedSample,
  models: {
    User,
    Favorite,
    Plan,
    Place
  }
};
