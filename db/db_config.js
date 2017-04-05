var mongoose = require('mongoose');
dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/iris';

mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', function(error) {
  console.log('there was an error with the database: ', error);
})

db.once('open', function(status) {
  console.log('the connection to mongodb was successful', dbUrl);
});

module.exports = db;

