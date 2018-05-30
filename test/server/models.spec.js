const expect = require('chai').expect;
const db = require('../../server/db');
const { User, Favorite , Plan, Place } = db.models;

// Models tests
describe('models', () => {
  describe('User', () => {
    it('model User exists.', () => {
      expect(User).to.be.ok;
    });
  });
  describe('Favorite', () => {
    it('model Group exists.', () => {
      expect(Favorite).to.be.ok;
    });
  });
  describe('Plan', () => {
    it('model Plan exists.', () => {
      expect(Plan).to.be.ok;
    });
  });
  describe('Place', () => {
    it('model Category exists.', () => {
      expect(Place).to.be.ok;
    });
  });
});

//Seeding test
describe('seeded data', () => {
  describe('User data', () => {
    let users;
    beforeEach(() => {
      return db.syncAndSeed()
        .then(() => User.findAll()
          .then(_users => users = _users));
    });
    it('we have 5 users in the database.', () => {
      expect(users.length).to.equal(5);
    });
  });
});

//User model test
describe('User model', () => {
  describe('instanceMethods', () => {
    describe('create new user', () => {
      let TestUser;

      beforeEach(() => {
        return User.create({
          username: 'Test User'
        })
          .then(user => {
            TestUser = user;
          });
      });
      it('User has been created', ()=> {
        expect(TestUser).to.be.ok;
      });

      it('Has a username on the model.', () => {
        expect(TestUser.username).to.be.equal('Test User');
      });

    });
  });
});
