const { conn } = require('./db');
const { User } = require('./db').models;

const axios = require('axios');

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

const seedSample = () => {
  return Promise.all([
    User.create({ username: 'Moe', password: 'MOE' }),
    User.create({ username: 'Larry', password: 'LARRY' }),
    User.create({ username: 'Curly', password: 'CURLY' })
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

console.log('Syncing database');

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

module.exports = seed;
