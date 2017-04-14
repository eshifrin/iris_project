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
const Auth0Strategy = require('./auth/Auth0');
const Auth0 = require('./auth/Auth0Helpers');
const sm = require('./socialmedia.js');
const rh = require('./routeHandler')
const cronJob = require('./cronJob.js');

// rh.sendScheduledPosts();

// const user = require('./routes/usercred');
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
// app.use('/', Auth0.landing);

/************************** Social media auth ******************************/

app.get('/twitter', sm.TWtoAuth);
app.get('/twitter/return', sm.TWfromAuth);

app.get('/facebook', sm.FBtoAuth);
app.get('/facebook/return', sm.FBfromAuth);

/************************** paths ******************************/

/*app.get('/', function(req, res, next) {
  console.log('inside broasis /');
  res.render('index', { title: 'Broasis!', env: env });
});*/

app.post('/api/image/imgLink', (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
      res.send(result.secure_url);
    })
})

//conditionally do this after passing them through Auth0
app.post('/api/user/now', rh.sendPostsNow)
app.route('/api/user/:post_type')
  .get(rh.sendUserPosts)
  .post(rh.scheduleOrSavePosts)
  .delete(rh.deletePost)

app.get('/usercred', rh.getUserCred);

app.get('/twitter', sm.TWtoAuth);
app.get('/twitter/return', sm.TWfromAuth);

app.get('/facebook', sm.FBtoAuth);
app.get('/facebook/return', sm.FBfromAuth);

/************************** catch all ******************************/

app.get('*', (req, res) => {
  // console.log(' checking cookies in req: ', req.cookies);
  // console.log(' checking cookies in response: ', res.cookies);
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000.');
});
