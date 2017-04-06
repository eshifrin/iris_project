const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const {user1, user1_scheduledPost, user1_postedPost} = require('./sampleData');


module.exports.savePost = (userId, postData, typeOfPost = 'scheduled') => {
    postData.user_id = userId;
    postData.status = typeOfPost;
    return Post(postData).saveAsync()
    .then(post => {
      return User.updateAsync(
              {_id: postData.user_id}, 
              {$push: {[typeOfPost]: post._id}});
    })
}

//change to userId instead of email after authentication
module.exports.showUserPosts = (email, typeofPost) => {
  return User.findOneAsync({email: email})
  .then(data => {
    if (!data) throw ('invalid user');
    let mappedPosts = data[typeofPost]
      .map(postId => module.exports.retrievePost(postId));
    return Promise.all(mappedPosts);
  })
}

module.exports.retrievePost = (postId) => {
  return Post.findOneAsync({_id: postId});
}

module.exports.populateSampleData = () => {
    return User(user1).saveAsync()
    .then(user => {
      return Promise.all([
        module.exports.savePost(user._id, user1_scheduledPost, 'scheduled'),
        module.exports.savePost(user._id, user1_postedPost, 'posted')
      ])
    })
    .then(e => {
      console.log('successfully populated sample data');
    })
    .catch(err => {
      console.error('error in aggregate sample data posting', err)
    })
}


