const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const FacebookStrategy = require('passport-facebook');
const axios = require('axios')

const Twitter = require('twitter');
const dbh = require('../db/db_helpers.js')


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

passport.use('facebook-authz', new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:3000/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {

    axios.request({
      url: `https://graph.facebook.com/${profile.id}/feed`,
      method: 'post',
      params: {'message':'testing123',
        'access_token': accessToken}
    }).then(console.log)
    .catch(e => console.log('error', e))

    return cb(null, profile); 
  }
));

//need to look into what these do - right now nothing
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


//rename this!
module.exports.toAuth = passport.authorize('twitter-authz');
module.exports.fromAuth = passport.authorize('twitter-authz', { failureRedirect: '/'});
module.exports.FBtoAuth = passport.authorize('facebook-authz', { scope: ['publish_actions'] });
module.exports.FBfromAuth = passport.authorize('facebook-authz', { failureRedirect: '/'});



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






