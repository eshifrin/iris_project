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
    callbackURL: 'http://localhost:3000/twitter/return',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, cb) {
    //we might want to do something w/the profile
    // console.log('in twitter authz - socialmedia');
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

    // console.log('in facebook authz - socialmedia');
    // console.log('here are the cookies', req.cookies)
    // console.log('here is the req.user', req.user)
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
  // console.log('in populate twitter client - socialmedia');
  var client = new Twitter({
    consumer_key: process.env.TW_KEY,
    consumer_secret: process.env.TW_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  return client;
};

module.exports.facebookPost = (profileId, accessToken, message, photoUrl) => {
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

module.exports.tweet = (client, message, pictureData) => {
  var params = {
    status: message
  };

  if (pictureData) {
    //this is what the client sends over...b64 strips out image/jpeg;base64
    // image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ
    const b64 = pictureData.replace(/^data:image\/[a-z]+;base64,/, "");
    const pictureDatainBinary = Buffer.from(b64, 'base64'); 
    return client.post('media/upload', {media: pictureDatainBinary})

    .then(media => {
      console.log('successful picture post', media)
      params.media_ids = media.media_id_string;
      return client.post('https://api.twitter.com/1.1/statuses/update.json', params)
    })
    .catch(err => {
      console.log('error sending media to twitter', err)
      return;
    })
  } else {
    return client.post('https://api.twitter.com/1.1/statuses/update.json', params)
  }
};






