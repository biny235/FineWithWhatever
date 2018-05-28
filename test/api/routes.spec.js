const app = require('supertest')(require('../../server/app.js'));
const jwt = require('jwt-simple');
const KEY = process.env.JWT_KEY;
const { expect } = require('chai');
const db = require('../../server/db');
const { User } = db.models;

//Root route
describe('Loading express', ()=> {
  it('It responds to /', (done)=> {
  app
    .get('/')
    .expect(200, done);
  });
  it('Sends 404 for everything else', (done)=> {
    app
      .get('/foo/bar')
      .expect(404, done);
  });
});

//User routes test, needs to be logged in as admin.
describe('User routes for Login', () => {
  let userMap;
  beforeEach(() => {
    return db.syncAndSeed()
    .then(()=> {
      userMap = User.findAll().reduce((memo, user)=> {
        memo[user.username] = user;
        return memo;
      },{});
      console.log(userMap);
      return userMap;
    });
  });

  describe('POST /auth/sessions', ()=> {
    it('returns token with correct credentials', ()=> {
      const token = jwt.encode({ id: userMap.moe.id}, KEY);
      return app.post('/auth/sessions')
        .send({ username: userMap.moe.username, password: userMap.moe.password})
        .expect(200)
        .then( result => {
          expect(result.body.token).to.equal(token);
        });
    });
    it('returns 401 with incorrect credentials', ()=> {
      return app.post('/auth/sessions')
        .send({ username: userMap.moe.username, password: 'nope'})
        .expect(401)
    });
  });
});

//   describe('GET /api/sessions/:token', ()=> {
//     it('returns user with a valid token with a valid user', ()=> {
//       const token = jwt.encode({ id: userMap.moe.id}, KEY);
//       return app.get(`/api/sessions/${token}`)
//         .expect(200)
//         .then( result => {
//           expect(result.body.username).to.equal(userMap.moe.username);
//         });
//     });
//     it('returns 401 with a valid token with a invalid user', ()=> {
//       const token = jwt.encode({ id: 3}, KEY);
//       return app.get(`/api/sessions/${token}`)
//         .expect(401);
//     });
//     it('returns 401 with invalid token', ()=> {
//       const token = jwt.encode({ id: userMap.moe.id}, KEY + '!');
//       return app.get(`/api/sessions/${token}`)
//         .expect(401);
//     });
//   });
// });
