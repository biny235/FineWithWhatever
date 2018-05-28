const expect = require('chai').expect;
const db = require('../../server/db');
const { User } = db.models;

//AUTHENTICATION TESTS
let userMap;
const jwt = require('jwt-simple');
const KEY = process.env.JWT_KEY;

describe('authentication', () => {
  beforeEach(() => {
    return User.findAll({})
      .then(users => {
        userMap = users.reduce((memo, user) => {
          memo[user.username] = user;
          return memo;
        }, {});
      });
  });
  describe('seeded data', () => {
    it('Moe, Larry, Curly exist', () => {
      expect(userMap.Moe.username).to.be.equal('Moe');
      expect(userMap.Larry.username).to.be.equal('Larry');
      expect(userMap.Curly.username).to.be.equal('Curly');
    });
  });

  describe('authenticate', () => {
    it('authenticating with correct credentials returns a token', () => {
      const Moe = userMap.Moe;
      const expectedToken = jwt.encode({
        id: Moe.id
      }, KEY);
      return User.authenticate({
       username: Moe.username,
        password: Moe.password
      })
     .then(token => expect(token).to.equal(expectedToken));
    });

    it('authenticating with incorrect credentials will throw an error with a 401 status', () => {
      const Moe = userMap.Moe;
      return User.authenticate({
        username: Moe.username,
        password: 'bad password'
      })
        .then(() => { throw 'no!!'; })
        .catch(ex => expect(ex.status).to.equal(401));
    });
  });

  describe('exchanging a token', () => {
    it('a valid token which matches a user returns the user', () => {
      const Moe = userMap.Moe;
      const token = jwt.encode({
        id: Moe.id
      }, KEY);
      return User.exchangeTokenForUser(token)
        .then(user => expect(user.username).to.equal(Moe.username));
    });

    it('a valid token which does not match a user will return an error with a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, KEY);
      return User.exchangeTokenForUser(token)
        .then(()=> { throw 'no!';})
        .catch(ex => expect(ex.status).to.equal(401));
    });

   it('a invalid token will return an error with a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, 'some silly key');
      return User.exchangeTokenForUser(token)
      .then(()=> {throw 'no!';})
      .catch(ex => expect(ex.status).to.equal(401));
    });

    it('a valid token with the wrong data type for a userId with will return a 401 status', () => {
      const token = jwt.encode({
        id: User.build().id
      }, 'some silly key');
      return User.exchangeTokenForUser(token)
      .then(()=> {throw 'no!';})
      .catch(ex => expect(ex.status).to.equal(401));
    });
  });
});
