const { User } = require('../db').models;

const auth = (req, res, next) => {
  const { token } = req.headers
  if(!token) {
    next({ status: 401 });
  }
  User.exchangeTokenForUser(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

const checkUser = (req, res, next) => {
  if(!req.user) next({status: 401, errors: [{message: "unauthorized"}]});
  next()
}

const isCorrectUser = (key, paramName) => {
  return (req, res, next) => {
    if(req[key][paramName] === req.user.id || req.user.isAdmin) {
      return next();
    }
    next({ status: 401 });
  };
};

module.exports = {
  auth,
  isCorrectUser,
  checkUser
};
