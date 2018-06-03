const router = require('express').Router();
const { User } = require('../../db').models;
const config = require('../../../config');
const googleSecret = config.GOOGLE_PLACES_KEY;

//Google AutoComplete routes.
const googleMapsClient = require('@google/maps').createClient({
  key: googleSecret,
  Promise: Promise
});

router.post('/autocomplete', (req, res, next) => {
  googleMapsClient.placesAutoComplete({ input: req.body.input }).asPromise()
    .then(resp => resp.json.predictions)
    .then(predictions => res.send(predictions));
});
router.post('/getplace', (req, res, next) => {
  googleMapsClient.reverseGeocode({ place_id: req.body.query }).asPromise()
    .then(resp => res.send(resp.json.results))
    .catch(next);
});

//OAuth middleware for authentication.
try{
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
