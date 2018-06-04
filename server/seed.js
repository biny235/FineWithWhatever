const { conn } = require('./db');
const { User } = require('./db').models;

const axios = require('axios');

const seed = () => {
  axios.get('https://randomuser.me/api/?results=1')
  .then(res => res.data.results)
  .then(results => {
    return Promise.all(results.map(result => {
      console.log(result)
       User.create({
        username: `${result.name.first} ${result.name.last}`,
        password: result.login.password,
        googleId: result.login.username,
        email: result.email,
        thumbnail: result.picture.thumbnail
      })
         .catch(err => console.log(err))
    }))
  })
  .catch(err => console.log(err))
}

console.log('Syncing database');

conn.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    conn.close();
    return null;
  });

