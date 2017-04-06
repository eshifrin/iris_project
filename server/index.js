const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
const db = require('../db/db_config');
const user = require('../db/models/user')
const path = require('path');
//-------------------------------------------------------------//

const app = express();

app.use(express.static(__dirname + '/../public/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// app.get('/api/futurePosts/:user', routeHandler.retrieveFuturePosts)



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000.');
});