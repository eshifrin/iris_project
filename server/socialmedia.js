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
    console.log('the req.user.displayName will be related to facebook', req.user.displayName);
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
    });
}));



passport.use('facebook-authz', new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:3000/facebook/return",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, cb) {

    return dbh.updateUserFacebook(req.user.displayName, accessToken, profile.id)
    .then(() => {
      return cb(null, profile); 
    })
    .catch(err => {
      console.log('Error saving tokens', err);
      return cb(null, profile);       
    });
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
module.exports.TWtoAuth = passport.authenticate('twitter-authz');
module.exports.TWfromAuth = passport.authenticate('twitter-authz', { failureRedirect: '/', successRedirect: '/'})
module.exports.FBtoAuth = passport.authenticate('facebook-authz', { scope: ['publish_actions'] });
module.exports.FBfromAuth = passport.authenticate('facebook-authz',  { failureRedirect: '/', successRedirect: '/'});



// Module.exports functions //
module.exports.populateTwitterClient = (token, tokenSecret) => {
  var client = new Twitter({
    consumer_key: process.env.TW_KEY,
    consumer_secret: process.env.TW_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  return client;
};

module.exports.facebookPost = (profileId, accessToken, message) => {
  return axios.request({
    url: `https://graph.facebook.com/${profileId}/feed`,
    method: 'post',
    params: {'message': message,
      'access_token': accessToken}
    })
}




module.exports.tweet = (client, message, cb) => {
  var params = {
    status: message
  };


  return new Promise((resolve, reject) => {
    return client.post('https://api.twitter.com/1.1/statuses/update.json', 
      params, (err, tweet, results) => {
        if (err) reject(err);
        else resolve(tweet);
      });
  }); 
};






