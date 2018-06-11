const router = require('express').Router();
const { Plan, Place, User } = require('../../db').models;
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
  .then(() => {
   return Place.findOne({where: {place_id: req.body.place_id}})
    .then(_place => {
      place = _place;
    });
  })
  .then(()=>{
    return Plan.findById(req.params.planId*1);
  })
  .then( plan => {
   return plan.addPlace(place); //theres no addRecommendation function
  })
  .then(recommendation =>{
    console.log(recommendation);
    return User.findById(req.params.userId)
    .then(user => recommendation.setUser(user));
  })
  .then(rec => res.send(rec))
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
