const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/iris';

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log('there was an error with the database: ', error);
})

db.once('open', (status) => {
  console.log('the connection to mongodb was successful', dbUrl);
});

module.exports = db;

