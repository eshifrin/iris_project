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
    console.log('in twitter authz - socialmedia');
    return dbh.updateUserTwitter({
      email: req.session.email,
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

    console.log('in facebook authz - socialmedia');
    console.log('here are the cookies', req.cookies)
    console.log('here is the req.user', req.user)
    return dbh.updateUserFacebook(req.session.email, accessToken, profile.id)
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
module.exports.TWtoAuth = passport.authorize('twitter-authz');
module.exports.TWfromAuth = passport.authenticate('twitter-authz', { failureRedirect: '/', successRedirect: '/'})
module.exports.FBtoAuth = passport.authorize('facebook-authz', { scope: ['publish_actions'] });
module.exports.FBfromAuth = passport.authenticate('facebook-authz',  { failureRedirect: '/', successRedirect: '/'});



// Module.exports functions //
module.exports.populateTwitterClient = (token, tokenSecret) => {
  console.log('in populate twitter client - socialmedia');
  var client = new Twitter({
    consumer_key: process.env.TW_KEY,
    consumer_secret: process.env.TW_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  return client;
};

module.exports.facebookPost = (profileId, accessToken, message) => {
  console.log('in facebook post - socialmedia');
  return axios.request({
    url: `https://graph.facebook.com/${profileId}/feed`,
    method: 'post',
    params: {'message': message,
      'access_token': accessToken}
    })
}




module.exports.tweet = (client, message, cb) => {
  console.log('in tweet function - socialmedia');
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






