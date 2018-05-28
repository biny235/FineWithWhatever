const conn = require('./conn');
const { Sequelize } = conn;
const KEY = process.env.JWT_KEY;
const jwt = require('jwt-simple');

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

User.authenticate = function (credentials) {
  return this.findOne({
    where: {
      username: credentials.username,
      password: credentials.password
    }
  })
    .then(user => {
      if (!user) {
        throw { status: 401 };
      }
      const token = jwt.encode({ id: user.id }, KEY);
      return token;
    }
    );
};

User.exchangeTokenForUser = function (token) {
  try {
    const id = jwt.decode(token, KEY).id;
    return User.findById(id)
      .then(user => {
        if (user) {
          return user;
        }
        throw { status: 401 };
      })
      .catch(() => { throw { status: 401 }; });
  }
  catch (ex) {
    return Promise.reject({ status: 401 });
  }
};

module.exports = User;
