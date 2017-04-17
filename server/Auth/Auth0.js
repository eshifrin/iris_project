const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
var dotenv = require('dotenv');
dotenv.load();
console.log('process.env', process.env.AUTH0_DOMAIN);

// This will configure Passport to use Auth0

var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    req.session.email = profile.emails[0].value;
    // console.log('in auth0 strategy');
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
