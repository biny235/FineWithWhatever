const router = require('express').Router();
const { User } = require('../../db').models;

try{
  const config = require('../../../config');
  Object.assign(process.env, config);
}
catch{
  console.log("you may be missing config variable")
}


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const attr = { googleId: profile.id };
    User.findOne({ where: attr })
      .then(user => {
        if(user){
          return user;
        }
        const { displayName, emails } = profile;
        return User.create(Object.assign(attr, {username: displayName, email: emails[0].value }))
      })
      .then(user => done(null, user))
      .catch(err => done(err));

}
));

router.user;

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false}),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
