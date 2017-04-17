const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const FacebookStrategy = require('passport-facebook');
const axios = require('axios')

const Twitter = require('twitter');
const dbh = require('../db/db_helpers.js')
const fs = require('fs');

passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: process.env.TW_KEY,
    consumerSecret: process.env.TW_SECRET,
    callbackURL: process.env.TW_CALLBACK || 'http://localhost:3000/twitter/return',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, cb) {
    //we might want to do something w/the profile
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
    passReqToCallback: true,
    enableProof: true
  },
  function(req, accessToken, refreshToken, profile, cb) {
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
module.exports.FBtoAuth = passport.authenticate('facebook-authz', { scope: ['publish_actions'] });
module.exports.FBfromAuth = passport.authenticate('facebook-authz',  { failureRedirect: '/login',
successRedirect: '/'});

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

module.exports.FBPost = (profileId, accessToken, message, photoUrl) => {
  let params = {
    'message': message,
    'access_token': accessToken
  };

  if (photoUrl) params.link = photoUrl;
  return axios.request({
    url: `https://graph.facebook.com/${profileId}/feed`,
    method: 'post',
    params
  });
}

module.exports.tweet = (userCred, message, pictureData) => {
  let client = module.exports.populateTwitterClient(userCred.twitter_token, userCred.twitter_secret)

  let params = {
    status: message
  }
    /* pictureData starts off in base 64
      but the client sends over the string starting with 'image/jpeg;base64'
      the code below strips that out */
  if (pictureData) {
    const b64 = pictureData.replace(/^data:image\/[a-z]+;base64,/, "");
    const pictureDatainBinary = Buffer.from(b64, 'base64'); 
    return client.post('media/upload', {media: pictureDatainBinary})
    .then(media => {
      params.media_ids = media.media_id_string;
      return client.post('https://api.twitter.com/1.1/statuses/update.json', params)
    })
  } else {
    return client.post('https://api.twitter.com/1.1/statuses/update.json', params)
  }
}
