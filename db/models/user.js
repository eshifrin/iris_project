const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//need to add salt
const UserSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  twitter_token: String,
  facebook_token: String,
  scheduled: [Schema.Types.ObjectId],
  posted: [Schema.Types.ObjectId]
});

const User = mongoose.model('User', UserSchema);


module.exports = User;