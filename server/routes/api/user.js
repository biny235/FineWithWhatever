const router = require('express').Router();
const { User } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

router.get('/', (req, res, next)=> {
  User.exchangeTokenForUser(req.headers.token)
    .then(user => res.send(user))
    .catch(next)

});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      const credentials = { username: user.username, password: user.password };
      return User.authenticate(credentials);
    })
    .then(token => res.send(token))
    .catch(next)
});

router.put('/', auth, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      user.update(req.body);
      res.send(user);
    })
    .catch(next);
});

router.delete('/', auth, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      user.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

router.get('/friends', auth, (req, res, next)=>{
  User.getFriends(req.user.id)
    .then(friends => {
      res.send(friends)})
    .catch(next)
})

router.post('/friends', auth, (req,res,next)=>{
  User.addFriend(req.user, req.body.friendId)
    .then(friends => res.send(friends))
    .catch(next)
})

router.get('/plan', auth,  (req, res, next)=>{
  User.findCurrentPlan(req.user.id)
    .spread(plan => res.send(plan))
    .catch(next)
})

router.get('/:id', auth,  (req, res, next)=>{
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

router.get('/:id/plan', auth,  (req, res, next)=>{
  console.log(req.params.id)
  User.findCurrentPlan(req.params.id)
    .spread(plan => res.send(plan))
    .catch(next)
})

module.exports = router;
