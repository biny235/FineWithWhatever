const router = require('express').Router();
const { Place } = require('../../db').models;

router.get('/', (req, res, next) => {
  Place.findAll()
    .then(places => res.send(places))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Place.create(req.body)
    .then(place => res.send(place))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      place.update(req.body);
      res.send(place);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      place.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
