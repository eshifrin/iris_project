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
    postData._id = post._id;
    return User.updateAsync(
            {_id: postData.user_id}, 
            {$push: {[postType]: post._id}});
  });
}

module.exports.deletePost = (userId, postId) => {
  return User.updateAsync(
    {_id: userId},
    {$pull: {'scheduled': postId}})
  .then(results => {
    return Post.removeAsync({_id: postId})
  })
}

module.exports.retrievePosts = (postIds) => {
  return Post.findAsync({_id: {$in: postIds} });
}

module.exports.showUserPosts = (email, typeofPost) => {
  return User.findOneAsync({email: email})
  .then(data => {
    console.log('data pls', data);
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
  return User.findOneAsync({email: email});
}

module.exports.getUserbyId = (id) => {
  return User.findOneAsync({_id: id});
}

module.exports.saveUser = (email) => {
  return User({email: email}).saveAsync();
}

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
  return Post.findAsync(
    { $and: [
        { 'scheduledDateTime': { $lte: new Date() } },
        { 'status': 'scheduled' },
        // { $or: [{ postedFacebookId: null,
        //          postedTwitterId: null }]}
      ]
    }
  )
  .then(data => {
    console.log('what is the data we get?', data);
    return data;
  })
}

module.exports.getScheduledEvents = () => {
  return Post.findAsync(
    { $and: 
      [ { 'scheduledDateTime': { $lte: new Date() } },
        { 'status': 'scheduled' } ]
    }
  );
};

module.exports.updatePostFields = (postId, field, newval) => {
  return Post.updateAsync({_id: postId}, {[field]: newval});
}

module.exports.moveScheduledToPosted = (userId, postId) => {
  return User.updateAsync(
    { _id: userId },
    { $pull: {'scheduled': postId },
      $push: {'posted': postId}
  });
}

// module.exports.updatePost = (userId, postData, postType) => {
  
// }
