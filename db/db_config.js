const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/iris';

mongoose.connect(dbUrl);
const db = mongoose.connection;
const dbh = require('./db_helpers') 


db.on('error', (error) => {
  console.log('there was an error with the database: ', error);
})

db.once('open', (status) => {
  console.log('db is working!', status);
});

module.exports = db;

