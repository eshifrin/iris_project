const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user_id: String,
  text: String,
  img: String,
  imgUrl: String,
  postToTwitter: Boolean,
  postedTwitterId: {type: String, default: null},
  postToFacebook: Boolean,
  postedFacebookId: {type: String, default: null},
  date: { type: Date, default: Date.now },
  scheduledDateTime: Date,
  status: String
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

