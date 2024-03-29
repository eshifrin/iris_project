const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../db/db_config');
const user = require('../db/models/user')
const path = require('path');
const fs = require('fs');
const app = express();
const multer = require('multer');
const passport = require('passport');
const Auth0Strategy = require('./Auth/Auth0');
const Auth0 = require('./Auth/Auth0Helpers');
const sm = require('./socialmedia.js');
const rh = require('./routeHandler')
const cronJob = require('./cronJob.js');
const cloudinaryUrl = require('./cloudinary.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// -------------------
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public/dist'));

/************************** Authorization ******************************/

app.use('/login', Auth0.login);
app.use('/callback', Auth0.authVerify, rh.userCheck);
app.use('/logout', Auth0.logout);

/************************** Social media auth ******************************/
app.get('/twitter', sm.TWtoAuth);
app.get('/twitter/return', sm.TWfromAuth);

app.get('/facebook', sm.FBtoAuth);
app.get('/facebook/return', sm.FBfromAuth);

/************************** paths ******************************/

//separate handlers depending on function of route
app.post('/api/image/imgLink', rh.imageLink)

//conditionally do this after passing them through Auth0
app.route('/api/user/:post_type')
  .get(rh.sendUserPosts)
  .post(rh.scheduleOrSavePosts)
  .delete(rh.deletePost)

app.route('/api/post/:action')
  .get(rh.getPostsById);

app.get('/userinfo', rh.getUserInfo);

app.get('/logout', Auth0.logout)
app.get('/deauthorize/:provider', rh.deauthorize);

/************************** catch all ******************************/

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000.');
});

module.exports = app;
