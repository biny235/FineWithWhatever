const db = require('../../../server/db');
const loadSeedData = ()=> {
    return db.syncAndSeed()
      .then( seed => {
        const userMap = seed.users.reduce((memo, user)=> {
          memo[user.username] = user;
          return memo;
        }, {});
        return userMap;
      });
}

module.exports = {
  loadSeedData
};
