const { conn } = require('./db');
const { User, Plan, Place } = require('./db').models;
const axios = require('axios');

//Place data
const places =  [
{
  name: 'Killarney Rose',
  lat: '40.7050604',
  lng: '-74.00865979999999',
  place_id: 'ChIJQalvcBZawokRGSuWUh6cZiI'
},
{
  name: 'Fraunces Tavern Museum',
  lat: '40.7033808',
  lng: '-74.01135219999999',
  place_id: 'ChIJn-PPbBRawokRG_eHiyuOIis'
},
{
  name: 'Stone Street Tavern',
  lat: '40.704215',
  lng: '-74.01019699999999',
  place_id: 'ChIJRXAoKBRawokR8U8kqAMMwSU'
}
];

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
          if(users[i].email !== user.email)
          users[i].addFriend(user);
        })
      }
    })
    .catch(err => console.log(err))
}

//seed plan for Moe with places.
const seedSample = () => {
  let _Plan;
  return Promise.all([
    User.create({ username: 'Moe', password: 'MOE' }),
    User.create({ username: 'Larry', password: 'LARRY' }),
    User.create({ username: 'Curly', password: 'CURLY' }),
    //Plan.create({ name: 'Test Plan', lat:'40.7050758', lng:'-74.00916039999998'})
  ])
  .then(([user1, user2, user3, plan]) => {
      //_Plan = plan;
      //_Plan.setUser(user1);
      user1.addFriend(user2);
      user1.addFriend(user3);
      return Promise.all(places.map(place => Place.create(place)));
  })
  .then(_Places=>{
    //return _Plan.setPlaces(_Places);
  });
};

console.log('Syncing database');
const main = () => {
  conn.sync({ force: true })
    .then(() => {
      console.log('Seeding database');
      return seed();
    })
    .then(() => seedSample())
    .then(() => console.log('Seeding successful'))
    .catch(err => {
      console.error('Error while seeding');
      console.error(err.stack);
    })
  }

  module.exports = main;
