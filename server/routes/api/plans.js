const router = require('express').Router();
const { Plan } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

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
