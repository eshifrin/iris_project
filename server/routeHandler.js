const dbh = require('../db/db_helpers');
const url = require('url');
const sm = require('./socialmedia.js');
const Promise = require('bluebird');
const cloudinaryUrl = require('./cloudinary.js');

module.exports.imageLink = (req, res, next) => {
  cloudinaryUrl(req.body.image)
  .then(result => res.send(result.secure_url))
  .catch((err) => {
    console.log('error with cloudinary', err);
    res.status(500).end();
  });
};

module.exports.deauthorize = (req, res, next) => {
  let provider = req.params.provider;
  let email = req.session.email;
  let tokenName = `${provider}_token`;

  if (!req.session.email) res.status(404).send();

  return dbh.getUser(req.session.email)
  .then((user) => {
    // if theres no user or they arent authorized
    if (!user || !user[tokenName]) {
      console.log('no user or relevant token');
      res.redirect('/');
    }
    return dbh.deleteCredentials(email, provider);
  })
  .then((deleted) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log('error deleting credentials', err);
    res.redirect('/');
  });
};

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
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;
  let resultsWithStats = [];
  // TODO: Create new function for this big block of code
  if (req.params.post_type === 'posted') {
    dbh.showUserPosts(email, req.params.post_type)
    .then((results) => {
      resultsWithStats = results;
      let tweetWithStats = '';
      let fbPostWithStats = '';
      for (let i = 0; i < results.length; i++) {
        if (results[i].postedTwitterId !== null) {
          tweetWithStats = `${tweetWithStats + results[i].postedTwitterId},`;
        }
        if (results[i].postedFacebookId !== null) {
          fbPostWithStats = `${fbPostWithStats + results[i].postedFacebookId},`;
        }
      }
      tweetWithStats = tweetWithStats.slice(0, -1);
      fbPostWithStats = fbPostWithStats.slice(0, -1);
      let smStats = [];
      smStats.push(sm.getTweetStats(email, tweetWithStats));
      smStats.push(sm.getFbPostStats(email, fbPostWithStats));
      return Promise.all(smStats);
    })
    .then((stats) => {
      for (let q = 0; q < resultsWithStats.length; q++) {
        resultsWithStats[q] = resultsWithStats[q].toObject();
      }
      for (let i = 0; i < stats.length; i++) {
        for (let k = 0; k < resultsWithStats.length; k++) {
          if (resultsWithStats[k].postedTwitterId === stats[0][i].id_str) {
            resultsWithStats[k].twFavCount = stats[0][i].favorite_count;
            resultsWithStats[k].twRetweetCount = stats[0][i].retweet_count;
            i++;
          }
        }
      }
      const fbPostIds = Object.keys(stats[1].data);
      for (let i = 0; i < resultsWithStats.length; i++) {
        for (let k = 0; k < fbPostIds.length; k++) {
          if (resultsWithStats[i].postedFacebookId === fbPostIds[k]) {
            resultsWithStats[i].fbLikeCount = stats[1].data[fbPostIds[k]].likes.summary.total_count;
            resultsWithStats[i].fbCommentCount = stats[1].data[fbPostIds[k]].comments.summary.total_count;
          }
        }
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
      dbh.deletePost(id, req.body.updatingPostId);
    })
    .catch((err) => {
      console.log('There was no such record with id : ', id, ' , err : ', err);
    })
    .then(() => dbh.savePost(id, req.body, req.body.status || 'scheduled'))
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

module.exports.sendTweet = (userCred, postInfo) => sm.tweet(userCred, postInfo.text, postInfo.img)
    .then((tweet) => {
      console.log('whats inside the tweet----', tweet);
      dbh.updatePostFields(postInfo._id, 'postedTwitterId', tweet.id_str)
      return 'Successful Tweet';
    })
    .catch((err) => {
      console.log('Error in tweet', err);
      return 'Unsuccessful Tweet';
    });

module.exports.sendFBPost = (userCred, postInfo) => sm.FBPost(userCred.facebook_id, userCred.facebook_token, postInfo.text, postInfo.imgUrl)
    .then((fbpost) => {
      dbh.updatePostFields(postInfo._id, 'postedFacebookId', fbpost.data.id)
      return 'Successful FBPost';
    })
    .catch((err) => {
      console.log('Error in tweet', err);
      return 'Unsuccessful Post';
    });

module.exports.sendScheduledPosts = () => dbh.getScheduledEvents()
  .then((scheduledPosts) => {
    console.log('here are the scheduledPosts', scheduledPosts)
    return Promise.map(scheduledPosts, (post) => {
      return this.sendScheduledPost(post);
    })
  })
  .catch((err) => {
    console.log('error for sendingScheduledPost in rh', err);
  });

module.exports.sendScheduledPost = (post) => {
  let userCredentials = '';

  return dbh.getUserbyId(post.user_id)
  .catch((err) => {
    throw `Error in getting user by id${err}`;
  })
  .then((userInfo) => {
    userCredentials = userInfo;
    return dbh.updatePostFields(post._id, 'status', 'posted');
  })
  .catch((err) => {
    throw `Error updating post fields from scheduled to posted${  err}`;
  })
  .then(() => dbh.moveScheduledToPosted(post.user_id, post._id))
  .catch((err) => {
    throw `Error moving scheduled post to posted${  err}`;
  })
  .then(() => {
    let posts = [];
    if (post.postToFacebook) posts.push(this.sendFBPost(userCredentials, post))
    if (post.postToTwitter) posts.push(this.sendTweet(userCredentials, post))
    return Promise.all(posts);
  })
  .catch((err) => {
    console.log(err);

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
    status: 'posted',
  };
  let userCredentials = '';

  dbh.getUser(email)
  .then((userInfo) => {
    userCredentials = userInfo;
    dbh.deletePost(userInfo._id, req.body.updatingPostId);
  })
  .catch((err) => {
    console.log('err while deleting rh - ', err);
  })
  .then(() => {
    console.log('what is post Info from rh.sendpostnow', postInfo);
    dbh.savePost(userCredentials._id, postInfo, 'posted');
  })
  .then(() => {
    let posts = [];
    if (postInfo.postToFacebook) posts.push(this.sendFBPost(userCredentials, postInfo))
    if (postInfo.postToTwitter) posts.push(this.sendTweet(userCredentials, postInfo))
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
  const email = req.session.email;
  return dbh.getUser(email)
  .then((data) => {
    if (!data) return dbh.saveUser(email)
    return
  })
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.error('Error checking user in database', err);
    res.redirect('/');
  });
};

module.exports.deletePost = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const postId = url_parts.query._id;

  return dbh.retrieveUserId(req.session.email)
  .then((userId) => dbh.deletePost(userId, postId))
  .then((results) => {
    // console.log('deletedPost in routehandler', results);
    res.end();
  })
  .catch((err) => {
    console.log('err in routehandler', err);
    console.log(req.body);
    res.status(404).send('Not found');
  });
};

module.exports.getUserInfo = (req, res, next) => {
  //look up Promise.reduce, refactor for no nested promises
  if (req.user) {
    let userCred = {};
    userCred.email = req.session.email;
    dbh.getUser(userCred.email)
    .then((data) => {
      userCred.twitter = !!(data.twitter_token);
      userCred.facebook = !!(data.facebook_id);
      //dont nest
      dbh.showUserPosts(userCred.email, 'scheduled')
      .then((results) => {
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
    })
    .catch(console.log)
  } else {
    res.send({ email: '', twitter: false, facebook: false });
  }
};
