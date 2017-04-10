var passport = require('passport');
var TwitterStrategy = require('passport-twitter');
var Twitter = require('twitter');
var dbh = require('../db/db_helpers.js')


passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: process.env.TW_KEY,
    consumerSecret: process.env.TW_SECRET,
    callbackURL: 'http://localhost:3000/twitter/return',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, cb) {
    //we might want to do something w/the profile

    return dbh.updateUserTwitter({
      email: req.user.displayName,
      token: token,
      tokenSecret: tokenSecret
    })
    .then(() => {
      return cb(null, profile); 
    })
    .catch(err => {
      console.log('Error saving tokens', err);
      return cb(null, profile);       
    })
  })
);

//need to look into what these do - right now nothing
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



module.exports.toAuth = passport.authorize('twitter-authz');
module.exports.fromAuth = passport.authorize('twitter-authz', { failureRedirect: '/'});

// Module.exports functions //
module.exports.populateClient = (token, tokenSecret) => {
  var client = new Twitter({
    consumer_key: process.env.TW_KEY,
    consumer_secret: process.env.TW_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  return client;
};



module.exports.tweet = function(client, message, cb) {
  var params = {
    status: message
  };

  client.post('https://api.twitter.com/1.1/statuses/update.json', 
    params, cb) 

  //    function(err) {
  //     err ? res.status(500).send(err) : res.redirect('/Home');
  // });
};






