const { conn } = require('./db');
const { User, Plan, Place, Recommendation } = require('./db').models;
const axios = require('axios');

//Place data
const places = [
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
          if (users[i].email !== user.email)
            users[i].addFriend(user);
        })
      }
    })
    .catch(err => console.log(err))
}


const seedSample = () => {
  let plan, moe, larry, curly;
  return Promise.all([
    User.create({ username: 'Moe', password: 'MOE', email:'moe@3.com', thumbnail: "https://pbs.twimg.com/media/CgdepNwW4AEXMm0.jpg" }),
    User.create({ username: 'Larry', password: 'LARRY', email:'larry@3.com', thumbnail: "https://i.imgur.com/w2G8btY.jpg" }),
    User.create({ username: 'Curly', password: 'CURLY', email:'curly@3.com', thumbnail: "https://www.neatorama.com/images/posts/20/71/71020/1397100109-0.jpg" }),
    Plan.create({ name: 'Test Plan', date: '2018-06-23', time: '11:40', category: 'Restaurants' })
  ])
  .then(([_moe, _larry, _curly, _plan]) => {
    moe = _moe;
    larry = _larry;
    curly = _curly;
    plan = _plan;
    plan.setUser(_moe);
    _moe.addFriend(_larry);
    _larry.addFriend(_moe);
    _moe.addFriend(_curly);
    _curly.addFriend(_moe);
    return Promise.all(places.map(place => Place.create(place)));
  })
  .then(_places => {
    return Promise.all(_places.map(place => plan.addPlace(place)));
  })
  .then(() => {
    return Recommendation.findAll({
      where: {
        planId: plan.id
      }
    });
  })
  .then(([reco1, reco2, reco3]) => {
    reco1.setUser(larry);
    reco2.setUser(larry);
    reco3.setUser(larry);
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
    });
};

module.exports = main;
