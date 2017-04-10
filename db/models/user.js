const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  twitter_token: { type: String, default: null },
  twitter_secret: { type: String, default: null },  
  facebook_token: { type: String, default: null },
  scheduled: [Schema.Types.ObjectId],
  posted: [Schema.Types.ObjectId]
});

const User = mongoose.model('User', UserSchema);


module.exports = User;