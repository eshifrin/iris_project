const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  twitter_token: String,
  facebook_token: String,
  future_posts: [Schema.Types.ObjectId],
  past_posts: [Schema.Types.ObjectId]
});

const User = mongoose.model('User', UserSchema);
const gary = new User({
  email: 'a@b.com',
  password: 'hello',
  twitter_token: '5432abc',
  facebook_token: '2923adc',
})

gary.save();

module.exports = User;