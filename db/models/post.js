const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  user_id: String,
  text: String,
  image: {data: Buffer, contentType: String},
  twitter: Boolean,
  facebook: Boolean,
  date: Date,
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;