const router = require('express').Router();
const { User } = require('../../db').models;

router.get('/', (req, res, next) => {
  if(!req.user){
    next({status: 401})
  }
  res.send(req.user)
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
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

router.get('/plan')

module.exports = router;
