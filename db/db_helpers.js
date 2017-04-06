const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require('mongoose');
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const {user1, user1_futurePost, user1_pastPost} = require('./sampleData');


module.exports = {
  populateSampleData: () => {
    User(user1).saveAsync()
    .then(user => {
      user1_futurePost.user_id = user._id;
      return Post(user1_futurePost).saveAsync()
    })
    .then(post => {
      return User.updateAsync(
                {_id: user1_futurePost.user_id}, 
                {$push: {future_posts: post._id}});
    })
    .then(() => {
      console.log('successful sample data posting');
    })
    .catch((e) => {
      console.log('error in populating sample data', e);
    });
  }

  //
  // retrieveFuturePosts: (userInfo) => {
  //   //retrieve userInfo.email
  //     //use it to look up
  //   // User.findOneAsync({email: userInfo.email})
  //   // .then(console.log);
  // }
}