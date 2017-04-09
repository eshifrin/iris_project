var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var oauth = require('oauth');

var app = express();

// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = "gh5jBEiZfZn1PJDxfUdwKdte0";
var _twitterConsumerSecret = "T275na7aBHvy2tIuf2Y1IYoVfwv0nw71DhxstN43vk3rr9R3xo";

var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:3000/sessions/callback", "HMAC-SHA1");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.get('/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + err);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      console.log("Double check on 2nd step");
      console.log("------------------------");
      console.log("<<"+req.session.oauthRequestToken);
      console.log("<<"+req.session.oauthRequestTokenSecret);
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/sessions/callback', function(req, res){
  console.log("!!!!!!!this is the req", req);
  console.log("------------------------");
  console.log(">>"+req.session.oauthRequestToken);
  console.log(">>"+req.session.oauthRequestTokenSecret);
  console.log(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + error + "[" + oauthAccessToken + "]" + "[" + oauthAccessTokenSecret + "]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/home');
    }
  });
});

app.get('/home', function(req, res){
    consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
        //console.log(error)
        res.redirect('/sessions/connect');
      } else {
        // var parsedData = JSON.parse(data);
                consumer.post(
                  "https://api.twitter.com/1.1/statuses/update.json",
                  req.session.oauthAccessToken, req.session.oauthAccessTokenSecret,
                  {"status":"nap reactor is fabulous #3"},
                  function(error, data) {
                      if(error) console.log(error)
                      else console.log(data)
                  }
               );        
        // res.send('You are signed in: ' + parsedData.screen_name);
        res.redirect('/');
      } 
    });
});

// app.get('*', function(req, res){
//     res.redirect('/home');
// });

app.listen(1337, function() {
  console.log('App runining on port 1337!');
});




