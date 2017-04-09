const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../db/db_config');
const user = require('../db/models/user')
const path = require('path');
const fs = require('fs');
const app = express();
const routeHandler = require('./routeHandler')
const multer = require('multer');
const passport = require('passport');
const Auth0Strategy = require('./auth/Auth0');
const Auth0 = require('./auth/Auth0Helpers');
const twitter = require('./twitter.js');
// const user = require('./routes/user');
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dzk49mshl', 
  api_key: '672315283378774', 
  api_secret: 'Fr9x5K3tELc1z9kkUH4EvhbD6hs' 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// -------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../public/dist'));

app.use('/login', Auth0.login);
app.use('/callback', Auth0.authVerify, Auth0.success);
app.use('/logout', Auth0.logout);

/************************** paths ******************************/

app.post('/api/image/imgLink', (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
      console.log('cloudinary server result', result);
      res.send(result.secure_url);
    })
})

app.route('/api/user/:post_type')
  //.all(authenticateuser)
  .get(routeHandler.sendUserPosts)
  .post(routeHandler.schedulePosts)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000.');
});
