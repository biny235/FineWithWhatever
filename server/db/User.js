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
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: 'https://commons.wikimedia.org/wiki/Category:Blank_persons_placeholders#/media/File:Elliot_Grieveson.png'
  }
},
{
  defaultScope:
  {
    attributes: { exclude: ['password'] },
  }
});
User.prototype.generateToken = function(){
  const token = jwt.encode({ id: this.id }, KEY);
  return token
}

User.authenticate = function (credentials) {
  const { username, password } = credentials;
  console.log(username, password)
  return this.findOne({
    where: {
      username: {$iLike: username},
      password
    }
  })
    .then(user => {
      if (!user) {
        throw { status: 401, errors: [{ message: "cant find User" }] };
      }
      return user.generateToken()
    }
    );
};

User.exchangeTokenForUser = function (token) {
  try {
    const id = jwt.decode(token, KEY).id;
    return User.findById(id, {attributes: ['id','username', 'email'], include: [{ all: true }]})
      .then(user => {
        if (user) {
          return user;
        }
        throw { status: 401, status: 401, errors: [{ message: "cant find User" }] };
      })
      .catch(() => { throw { status: 401 }; });
  }
  catch (ex) {
    return Promise.reject({ status: 401 });
  }
};

User.getFriends = function (id) {
  return User.findById(id)
    .then(user => user.getFriends({where:{id: { $ne: id }}, attributes: ['id','username', 'email']}))
};

User.findCurrentPlan = function (id) {

  return conn.models.plan.findOrCreate({

    where: { status: {$ne: 'CLOSED'}, userId: id },
    defaults: { status: 'NEW', userId: id },
    include: [{ all: true }]

  })
}

User.addFriend = function (user, friend){
  return friend.addFriend(user)
    .then(()=>user.addFriend(friend))
    .then(() => user.getFriends())

}


module.exports = User;
