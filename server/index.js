var express = require('express');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var expressSession = require('express-session');
var db = require('../db/db_config');
var path = require('path');
//-------------------------------------------------------------//

var app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000.');
});