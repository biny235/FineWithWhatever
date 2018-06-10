const router = require('express').Router();
const { Plan } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

router.get('/',  (req, res, next) => {
  console.log(req);
  Plan.findAll()
    .then(plans => res.send(plans))
    .catch(next);
});

router.post('/',  (req, res, next) => {
  Plan.create(req.body)
    .then(plan => res.send(plan))
    .catch(next);
});

router.put('/:id',  (req, res, next) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.update(req.body);
      res.send(plan);
    })
    .catch(next);
});


router.delete('/:id',  (req, res, next) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
