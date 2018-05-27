const config = require('../config');

Object.assign(process.env, config)


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
app.use(passport.initialize());

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const attr = { googleId: profile.id }
    User.findOne({ where: attr })
      .then(user => {
        if(user){
          return user
        }
        const { displayName, emails } = profile
        return User.create(Object.assign(attr, {username: displayName, email: emails[0].value }))
      })
      .then(user => done(null, user))
      .catch(err => done(err))

}
));
app.user
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false}),
  function(req, res) {
    res.redirect('/');
});