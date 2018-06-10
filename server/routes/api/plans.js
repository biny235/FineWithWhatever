const router = require('express').Router();
const { Plan, Place } = require('../../db').models;
const { auth, checkUser } = require('../authFuncs');

router.put('/:id', [auth, checkUser], (req, res, next) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.update(req.body);
      res.send(plan);
    })
    .catch(next);
});

router.post('/:planId/user/:userId/recommend', [auth, checkUser], (req, res, next) => {
  let place;
  Place.findOrCreatePlace(req.body)
  .then( _place =>{
    place = _place;
    return Plan.findById(req.params.planId);
  })
  .then( plan => {
    const userId = req.params.userId;
    const placeId = place.id;
    plan.addRecommendation(userId, placeId);
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
