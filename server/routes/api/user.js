const router = require('express').Router();
const { User } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

router.get('/', auth, (req, res, next)=> {
  checkUser(req.user)
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
    .then(token => res.send(token));
});

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(req.body);
      res.send(user);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

router.get('/friends', auth, (req, res, next)=>{
  checkUser(req.user);
  User.getFriends(req.user.id)
    .then(friends => res.send(friends))
    .catch(next)
})

router.get('/plan', auth, (req, res, next)=>{
  checkUser(req.user);
  User.findCurrentPlan(req.user.id)
    .then(plan => res.send(plan))
    .catch(next)
})


module.exports = router;
