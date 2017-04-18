const dbh = require('../db/db_helpers');
const url = require('url');
const sm = require('./socialmedia.js')
const Promise = require('bluebird');
const cloudinaryUrl = require('./cloudinary.js')

module.exports.imageLink = (req, res, next) => {
  cloudinaryUrl(req.body.image)
  .then(result => res.send(result.secure_url))
  .catch((err) =>  {
    console.log('error with cloudinary', err)
    res.status(500).end();
  });
}

module.exports.deauthorize = (req, res, next) => {
  let provider = req.params.provider;
  let email = req.session.email;
  let tokenName = `${provider}_token`;

  console.log('in deauthorize', provider, email, tokenName)

  if (!req.session.email) res.status(404).send();

  return dbh.getUser(req.session.email)
  .then((user) => {
    //if theres no user or they arent authorized
    if (!user || !user[tokenName]) {
      console.log('no user or relevant token')
      res.redirect('/');
    }
    return dbh.deleteCredentials(email, provider);
  })
  .then((deleted) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log('error deleting credentials', err)
    res.redirect('/');
  })
}

module.exports.getPostsById = (req, res, next) => {
  const postId = req.query.postId;
  return dbh.retrievePosts(postId)
  .then((results) => {
    res.status(200).json(results);
  })
  .catch(err => console.log('Error in getting posts by id in rh', err));
};

// if authenticated, send posts
// TOFIX: change function name to getPastPosts
module.exports.sendUserPosts = (req, res, next) => {
  console.log('send user post is running 1');
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;
  let resultsWithStats = [];
  // TODO: Create new function for this big block of code
  if (req.params.post_type === 'posted') {
    dbh.showUserPosts(email, req.params.post_type)
    .then((results) => {
      resultsWithStats = results;
      let postWithStats = '';
      for (let i = 0; i < results.length; i++) {
        postWithStats = postWithStats + results[i].postedTwitterId + ',';
      }
      postWithStats = postWithStats.slice(0, -1);
      return sm.getPostsStats(postWithStats);
    })
    .then((stats) => {
      for (let i = 0; i < stats.length; i++) {
        resultsWithStats[i] = resultsWithStats[i].toObject();
        resultsWithStats[i]['twFavCount'] = stats[i]['favorite_count'];
        resultsWithStats[i]['twRetweetCount'] = stats[i]['retweet_count'];
      }
      return resultsWithStats;
    })
    .catch((err) => {
      console.log('Error compiling POSTED Tweets', err);
    })
    .then((resultsWithStats) => {
      res.status(200).json(resultsWithStats);
    })
    .catch((err) => {
      if (err === 'invalid user') res.status(404).end();
      else res.status(500).end();
    });
  } else {
    dbh.showUserPosts(email, req.params.post_type)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log('Error compiling non-posted Tweets', err);
    });
  }
};

// if authenticated, send posts
module.exports.scheduleOrSavePosts = (req, res, next) => {
  if (req.params.post_type === 'scheduled') {
    let id = '';
    dbh.retrieveUserId(req.session.email)
    .then((postid) => {
      id = postid;
      dbh.deletePost(id, req.body.updatingPostId)
    })
    .catch((err) => {
      console.log('There was no such record with id : ', id, ' , err : ', err);
    })
    .then(() => {
      return dbh.savePost(id, req.body, req.body.status || 'scheduled')
    })
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log('err in schduleor save posts - rh : ', err);
      if (err === 'invalid user') res.status(404).end();
      else res.status(500).end();
    });
  } else if (req.params.post_type === 'now') {
    module.exports.sendPostsNow(req, res, next);
  }
};

module.exports.sendTweet = (userCred, postInfo) => {
  return sm.tweet(userCred, postInfo.text, postInfo.img)
    .then((tweet) => {
      console.log('whats inside the tweet----', tweet);
      dbh.updatePostFields(postInfo._id, 'postedTwitterId', tweet.id_str)
      return 'Successful Tweet';
    })
    .catch((err) => {
      console.log('Error in tweet', err);
      return 'Unsuccessful Tweet';
    });
};

module.exports.sendFBPost = (userCred, postInfo) => {
  return sm.FBPost(userCred.facebook_id, userCred.facebook_token, postInfo.text, postInfo.imgUrl)
    .then((fbpost) => {
      dbh.updatePostFields(postInfo._id, 'postedFacebookId', fbpost.data.id)
      return 'Successful FBPost';
    })
    .catch((err) => {
      console.log('Error in tweet', err);
      return 'Unsuccessful Post';
    });
};

module.exports.sendScheduledPosts = () => {
  return dbh.getScheduledEvents()
  .then((scheduledPosts) => {
    console.log('here are the scheduledPosts', scheduledPosts)
    return Promise.map(scheduledPosts, (post) => {
      return module.exports.sendScheduledPost(post);
    });
  })
  .catch((err) => {
    console.log('error for sendingScheduledPost in rh', err);
  });
};

module.exports.sendScheduledPost = (post) => {
  let userCredentials = '';

  return dbh.getUserbyId(post.user_id)
  .catch((err) => {
    throw 'Error in getting user by id' + err;
  })
  .then((userInfo) => {
    userCredentials = userInfo;
    return dbh.updatePostFields(post._id, 'status', 'posted')
  })
  .catch((err) => {
    throw 'Error updating post fields from scheduled to posted' + err;
  })
  .then(() => {
    return dbh.moveScheduledToPosted(post.user_id, post._id);
  })
  .catch((err) => {
    throw 'Error moving scheduled post to posted' + err;
  })
  .then(() => {
    const posts = [];
    if (post.postToFacebook) posts.push(module.exports.sendFBPost(userCredentials, post))
    if (post.postToTwitter) posts.push(module.exports.sendTweet(userCredentials, post))
    return Promise.all(posts);
  })
  .catch((err) => {
    console.log(err);
    return;
  });
};

module.exports.sendPostsNow = (req, res, next) => {
  console.log('what is in this req.body?', req.body);
  const email = req.body.email;
  const postInfo = {
    text: req.body.text,
    img: req.body.img,
    imgUrl: req.body.imgUrl,
    postToTwitter: req.body.postToTwitter,
    postToFacebook: req.body.postToFacebook,
    status: 'posted'
  }
  let userCredentials = '';

  dbh.getUser(email)
  .then((userInfo) => {
    userCredentials = userInfo;
    dbh.deletePost(userInfo._id, req.body.updatingPostId)
  })
  .catch((err) => {
    console.log('err while deleting rh - ', err);
  })
  .then(() => {
    console.log('what is post Info from rh.sendpostnow', postInfo);
    dbh.savePost(userCredentials._id, postInfo, 'posted')
  })
  .then(() => {
    const posts = [];
    if (postInfo.postToFacebook) posts.push(module.exports.sendFBPost(userCredentials, postInfo))
    if (postInfo.postToTwitter) posts.push(module.exports.sendTweet(userCredentials, postInfo))
    return Promise.all(posts);
  })
  .catch((err) => {
    console.log(err);
    res.status(404).send('Not found');
  })
  .then((posts) => {
    res.send(posts);
  });
};

module.exports.userCheck = (req, res, next) => {
  let email = req.session.email;
  return dbh.getUser(email)
  .then((data) => {
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
  .then((userId) => {
    return dbh.deletePost(userId, postId)
  })
  .then((results) => {
    // console.log('deletedPost in routehandler', results);
    res.end()
  })
  .catch((err) => {
    console.log('err in routehandler', err);
    console.log(req.body);
    res.status(404).send('Not found');
  });
};

module.exports.getUserInfo = (req, res, next) => {
  // console.log('getUserCred req cookies: ', req.cookies);
  // console.log('getUserCred req user: ', req.user);
  console.log('getUserCred req session: ', req.session.email);

  if (req.user) {
    const userCred = {};
    userCred.email = req.session.email;
    dbh.getUser(userCred.email)
    .then((data) => {
      console.log('data from get user : ', data);
      userCred.twitter = (data.twitter_token) ? true : false;
      userCred.facebook = (data.facebook_id) ? true : false;

      dbh.showUserPosts(userCred.email, 'scheduled')
      .then((results) => {
        console.log('-----------------', results);
        userCred.scheduledPosts = results;
        dbh.showUserPosts(userCred.email, 'posted')
        .then((posts) => {
          userCred.pastPosts = posts;
          res.send(userCred);
        })
        .catch((err) => {
          console.log('err in getting past results : ', err);
          if (err === 'invalid user') res.status(404).end();
          else res.status(500).end();
        });
      })
      .catch((err) => {
        console.log('error in getting scheduled results ');
        if (err === 'invalid user') res.status(404).end();
        else res.status(500).end();
      });
    });
  } else {
    res.send({ email: '', twitter: true, facebook: true });
  }
};
