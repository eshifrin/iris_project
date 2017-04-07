const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const { user1, user1_scheduledPost, user1_postedPost } = require('./sampleData');

module.exports.savePost = (userId, postData) => {
  postData.user_id = userId;
  return Post(postData).saveAsync()
  .then(post => {
    return User.updateAsync(
            {_id: postData.user_id}, 
            {$push: {[postData.status]: post._id}});
  });
}

module.exports.retrievePosts = (postIds) => {
  return Post.findAsync({_id: {$in: postIds} })
}

//change to userId instead of email after authentication
module.exports.showUserPosts = (email, typeofPost) => {
  return User.findOneAsync({email: email})
  .then(data => {
    if (!data) throw ('invalid user');
    else return module.exports.retrievePosts(data[typeofPost])
  })
}

module.exports.retrieveUserId = (email) => {
  return User.findOneAsync({email: email})
  .then(data => {
    if (!data) throw ('invalid user');
    else return data._id;
  })
}

module.exports.populateSampleData = () => {
    return User(user1).saveAsync()
    .then(user => {
      return Promise.all([
        module.exports.savePost(user._id, user1_scheduledPost),
        module.exports.savePost(user._id, user1_postedPost)
      ])
    })
    .then(() => {
      console.log('successfully populated sample data');
    })
    .catch(err => {
      console.error('error in aggregate sample data posting', err)
    })
}
