const Post = require('./models/post');
const User = require('./models/user');
const mongoose = require('mongoose');

const Promise = require('bluebird');
Promise.promisifyAll(mongoose);
const { user1, user1_scheduledPost, user1_scheduledPost2, user1_postedPost } = 
        require('./sampleData');

module.exports.savePost = (userId, postData, postType) => {
  postData.user_id = userId;
  postData.status = postType;
  return Post(postData).saveAsync()
  .then(post => {
    return User.updateAsync(
            {_id: postData.user_id}, 
            {$push: {[postType]: post._id}});
  });
}

module.exports.deletePost = (userId, postId) => {
  //error handling
  return User.updateAsync(
    {_id: userId},
    {$pull: {'scheduled': postId}})
  .then(results => {
    //need error handling
    // console.log('deleted from user in db', results);
    return Post.removeAsync({_id: postId})
  })
}

module.exports.retrievePosts = (postIds) => {
  return Post.findAsync({_id: {$in: postIds} })
}

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
  });
}

module.exports.getUser = (email) => {
  // console.log('in dbh get user : email: ', email);
  return User.findOneAsync({email: email});
}

module.exports.saveUser = (email) => {
  return User({email: email}).saveAsync();
}

//can abstract this to update other info
module.exports.updateUserTwitter = ({email, token, tokenSecret}) => {
 return User.updateAsync(
      { email: email},
      { $set:  {twitter_token: token,
                twitter_secret: tokenSecret }})
}

module.exports.updateUserFacebook = (email, token, facebook_id) => {
 return User.updateAsync(
      { email: email},
      { $set:  {facebook_token: token,
                facebook_id: facebook_id }})
}

module.exports.checkScheduledEvent = (dateTime) => {
  console.log('!!!!!+', dateTime);
  return Post.findAsync(
    { 'scheduledDateTime': { $lte: dateTime }}
  )
  .then(data => {
    // console.log('the data', data);
    return data;
  })
}

module.exports.moveScheduledToPosted = () => {
  // take post IDs as parameters
  // shift() to remove from scheduled
  // push to insert into posted
}

// module.exports.populateSampleData = () => {
//     return User(user1).saveAsync()
//     .then(user => {
//       return Promise.all([
//         module.exports.savePost(user._id, user1_scheduledPost, 'scheduled'),
//         module.exports.savePost(user._id, user1_scheduledPost2, 'scheduled'),
//         module.exports.savePost(user._id, user1_postedPost, 'posted')
//       ])
//     })
//     .then(() => {
//       console.log('successfully populated sample data');
//     })
//     .catch(err => {
//       console.error('error in aggregate sample data posting', err)
//     })
// }
