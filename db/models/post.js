var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
  user_id: String,
  text: String,
  image: {data: Buffer, contentType: String},
  twitter: Boolean,
  facebook: Boolean,
  date: Date,
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;