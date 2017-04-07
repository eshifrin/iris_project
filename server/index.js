const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
const db = require('../db/db_config');
const user = require('../db/models/user')
const path = require('path');
const fs = require('fs');
const app = express();
const routeHandler = require('./routeHandler')
const multer = require('multer');
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dzk49mshl', 
  api_key: '672315283378774', 
  api_secret: 'Fr9x5K3tELc1z9kkUH4EvhbD6hs' 
});

app.use(express.static(__dirname + '/../public/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/image/imgLink', (req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
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
