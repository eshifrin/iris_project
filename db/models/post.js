const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user_id: String,
  text: String,
  img: { type: Buffer, contentType: String },
  imgUrl: String,
  postToTwitter: Boolean,
  postToFacebook: Boolean,
  date: { type: Date, default: Date.now },
  status: String
});
//status: scheduled, approved, posting, posted

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

//create a new an expired post for 2 different users
  //add the id of each post to the relevant array