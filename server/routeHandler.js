const dbh = require('../db/db_helpers');
const url = require('url');
const sm = require('./socialmedia.js')
const Promise = require('bluebird');

//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;

  dbh.showUserPosts(email, req.params.post_type)
  .then(results => {
    // console.log('results in showuserposts: ', results)
    res.status(200).json(results);
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  });
}

//if authenticated, send posts
module.exports.scheduleOrSavePosts = (req, res, next) => {
  console.log('whats the req body here?', req.body);
  // let scheduledPostIds = req.body.scheduledPostIds;
  // dbh.retrieveUserId(req.email)
  dbh.retrieveUserId(req.session.email)
  .then(id => {
    // dbh.deletePost(id, scheduledPostIds);
    return dbh.savePost(id, req.body, req.body.status || 'scheduled')
  })
  .then(() => {
    res.status(200).end();
  })
  .catch(err => {
    console.log('err in schduleor save posts - rh : ', err);
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  })
}

module.exports.sendTweet = (userCred, postInfo) => {
  return sm.tweet(userCred, postInfo.text, postInfo.img)
    .then(tweet => {
      dbh.updatePostFields(postInfo._id, 'postedTwitterId', tweet.id)
      return 'Successful Tweet';
    })
    .catch(err => {
      console.log('Error in tweet', err)
      return 'Unsuccessful Tweet';
    })
}

module.exports.sendFBPost = (userCred, postInfo) => {
  return sm.FBPost(userCred.facebook_id, userCred.facebook_token, postInfo.text, postInfo.imgUrl)
    .then(fbpost => {
      dbh.updatePostFields(postInfo._id, 'postedFacebookId', fbpost.data.id)
      return 'Successful FBPost';
    })
    .catch(err => {
      console.log('Error in tweet', err)
      return 'Unsuccessful Post';
    })
}

module.exports.sendScheduledPosts = () => {
  return dbh.getScheduledEvents()
  .then((scheduledPosts) => {
    console.log('here are the scheduledPosts', scheduledPosts)
    return Promise.map(scheduledPosts, (post) => {
      return module.exports.sendScheduledPost(post);
    })
  })
  .catch(err => {
    console.log('error for sendingScheduledPost in rh', err);
  })
}

module.exports.sendScheduledPost = (post) => {
  let userCredentials = '';

  return dbh.getUserbyId(post.user_id)
  .catch(err => {
    throw 'Error in getting user by id' + err;
  })
  .then(userInfo => {
    userCredentials = userInfo;
    return dbh.updatePostFields(post._id, 'status', 'posted')
  })
  .catch(err => {
    throw 'Error updating post fields from scheduled to posted' + err;
  })
  .then(() => {
    return dbh.moveScheduledToPosted(post.user_id, post._id);
  })
  .catch(err => {
    throw 'Error moving scheduled post to posted' + err;
  })
  .then(() => {
    let posts = [];
    if (post.postToFacebook) posts.push(module.exports.sendFBPost(userCredentials, post))
    if (post.postToTwitter) posts.push(module.exports.sendTweet(userCredentials, post))
    return Promise.all(posts);
  })
  .catch((err) => {
    console.log(err)
    return;
  })
}

module.exports.sendPostsNow = (req, res, next) => {
  let email = req.body.email;
  let postInfo = {
    text: req.body.text,
    img: req.body.img,
    imgUrl: req.body.imgUrl,
    postToTwitter: req.body.postToTwitter,
    postToFacebook: req.body.postToFacebook,
    status: 'posted'
  }
  let userCredentials = '';

  dbh.getUser(email)
  .then(userInfo => {
    userCredentials = userInfo;
    return dbh.savePost(userInfo._id, postInfo, 'posted')
  })
  .then(() => {
    let posts = [];
    if (postInfo.postToFacebook) posts.push(module.exports.sendFBPost(userCredentials, postInfo))
    if (postInfo.postToTwitter) posts.push(module.exports.sendTweet(userCredentials, postInfo))
    return Promise.all(posts);
  })
  .catch((err) => {
    console.log(err);
    res.status(404).send('Not found');
  })
  .then(posts => {
    res.send(posts);
  })
}

module.exports.userCheck = (req, res, next) => {
  let email = req.session.email;
  return dbh.getUser(email)
  .then(data => {
    // console.log('usercheck if user exists, data : ', data);
    if (!data) return dbh.saveUser(email)
    else return
  })
  .then(() => {
    // console.log(' checking cookies in req: ', req.cookies);
    // res.cookie('email', email);
    res.redirect('/');
  })
  .catch((err) => {
    console.error('Error checking user in database', err)
    res.redirect('/');
  });
};

module.exports.deletePost = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const postId = url_parts.query._id;

  return dbh.retrieveUserId(req.session.email)
  .then(userId => {
    return dbh.deletePost(userId, postId)
  })
  .then(results => {
    console.log('deletedPost in routehandler', results);
    res.end()
  })
  .catch(err => {
    console.log('err in routehandler', err);
    console.log(req.body);
    res.status(404).send('Not found');
  });
}

module.exports.getUserInfo = (req, res, next) => {
  // console.log('getUserCred req cookies: ', req.cookies);
  // console.log('getUserCred req user: ', req.user);
  console.log('getUserCred req session: ', req.session.email);

  if (req.user) {
    let userCred = {};
    userCred.email = req.session.email;
    dbh.getUser(userCred.email)
    .then((data) => {
      // console.log('data from get user : ', data);
      userCred.twitter = (data.twitter_token) ? true : false;
      userCred.facebook = (data.facebook_id) ? true : false;

      dbh.showUserPosts(userCred.email, 'scheduled')
      .then(results => {
        userCred.scheduledPosts = results;
        dbh.showUserPosts(userCred.email, 'posted')
        .then(posts => {
          userCred.pastPosts = posts;
          res.send(userCred);
        })
        .catch(err => {
          console.log('err in getting past results : ', err);
          if (err === 'invalid user') res.status(404).end();
          else res.status(500).end();
        });
      })
      .catch(err => {
        console.log('error in getting scheduled results ');
        if (err === 'invalid user') res.status(404).end();
        else res.status(500).end();
      });

    })
  } else {
    res.send({email: '', twitter: true, facebook: true});
  }
}
