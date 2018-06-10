const router = require('express').Router();
const { Plan } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

router.get('/', [auth, checkUser], (req, res, next) => {
  Plan.findAll()
    .then(plans => res.send(plans))
    .catch(next);
});

router.post('/', [auth, checkUser], (req, res, next) => {
  Plan.create(req.body)
    .then(plan => res.send(plan))
    .catch(next);
});

router.put('/:id', [auth, checkUser], (req, res, next) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.update(req.body);
      res.send(plan);
    })
    .catch(next);
});


router.delete('/:id', [auth, checkUser], (req, res, next) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
