var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  email: {type String, unique: true, required: true},
  password: {String, required: true},
  twitter_token: String,
  facebook_token: String,
  future_posts: [Schema.Types.ObjectId],
  past_posts: [Schema.Types.ObjectId]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;