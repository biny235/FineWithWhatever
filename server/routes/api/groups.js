const router = require('express').Router();
const { Group } = require('../../db').models;

router.get('/', (req, res, next) => {
  Group.findAll()
    .then(groups => res.send(groups))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Group.create(req.body)
    .then(group => res.send(group))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Group.findById(req.params.id)
    .then(group => {
      group.update(req.body);
      res.send(group);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Group.findById(req.params.id)
    .then(group => {
      group.destroy();
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
