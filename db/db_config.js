const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/iris';

mongoose.connect(dbUrl);
const db = mongoose.connection;
const dbh = require('./db_helpers') 


db.on('error', (error) => {
  console.log('there was an error with the database: ', error);
})

db.once('open', (status) => {
  db.dropDatabase()
  .then(() => dbh.populateSampleData())
  // .then(() => dbh.retrieveFuturePosts({email: 'gary@b.com'}))
});

module.exports = db;

