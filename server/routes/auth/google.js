const router = require('express').Router();
const { User } = require('../../db').models;

try{
  const config = require('../../../config');
  Object.assign(process.env, config);
}
catch(err){
  console.log("you may be missing config variable")
}


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${process.env.GOOGLE_CALLBACK}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    const attr = { googleId: profile.id };
    User.findOne({ where: attr })
      .then(user => {
        if(user){
          return user;
        }
        const { displayName, emails } = profile;
        return User.create(Object.assign(attr, { username: displayName, email: emails[0].value }))
      })
      .then(user => done(null, user))
      .catch(err => done(err));

}
));

router.user;

router.get('/',
  passport.authenticate('google', { scope: 'email' }));

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false}),
  function(req, res) {
    const token = req.user.generateToken()
    res.redirect(`exp://localhost:19000/?token=${token}`);
});

module.exports = router;
