const dbh = require('../db/db_helpers');
const url = require('url');
const sm = require('./socialmedia.js')

//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;

  dbh.showUserPosts(email, req.params.post_type)
  .then(results => {
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
    console.log(err)
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  })
}

module.exports.sendFacebookNow = (req, res, next) => {
  console.log('FB email format: ', req.session.email);
  console.log('FB message format: ', req.body.text);
  let email = req.session.email;
  let message = req.body.text;
  let image = req.body.imgUrl;
    console.log('in send facebook now', image)
  return dbh.getUser(email)
  .then(data => {
    console.log('what is this data?', data);
    if (!data) throw 'invalid user'
    else return sm.facebookPost(data.facebook_id, data.facebook_token, message, req.body.imgUrl);
  })
  .then(fbpost => {
    console.log('what is this fbpost thing?', fbpost);
    req.body.postedFacebookId = fbpost.data.id;
    return 'Facebook Successful'
  })
  .catch(err => {
    console.log('error in facebook posting', err)
    return err;
  })
}

module.exports.sendTwitterNow = (req, res, next) => {
  console.log('Twitter email format: ', req.session.email);
  console.log('Twitter message format: ', req.body.text);
  let email = req.session.email
  let message = req.body.text;
  let img = req.body.img;

  return dbh.getUser(email)
  .then(data => {
    if (!data) throw 'invalid user';
    else return sm.populateTwitterClient(data.twitter_token, data.twitter_secret);
  })
  .then(client => {
    return sm.tweet(client, message, req.body.img)
    console.log('what is Tw client?', client);
  })
  .then(tweet => {
    console.log('is tweet successful?', tweet);
    req.body.postedTwitterId = tweet.id;
    let successMsgAndTweetId = ['Twitter Successful', tweet.id];
    console.log('tw sucecss??', successMsgAndTweetId);
    return successMsgAndTweetId;
  })
  .catch(err => {
    console.log('error in twitter posting', err)
    return err;
  })
};

module.exports.sendPostsNow = (req, res, next) => {
  let posts = [];
  console.log('what is this req?', req);
  // let scheduledPostIds = req.scheduledPostIds[0];
  console.log('what is in req', req.body.email, req.body.postToFacebook);
  if (req.body.postToFacebook) posts.push(module.exports.sendFacebookNow(req, res, next));
  if (req.body.postToTwitter) posts.push(module.exports.sendTwitterNow(req, res, next));
  console.log('what are the posts?', posts);

  Promise.all(posts)
  .catch(e => {
    return posts
  })
  .then(postResults => {
    console.log('post results??', postResults);
    req.body.status = 'posted';
    req.body.scheduledPostIds = scheduledPostIds;
    console.log('whats the req.body now?', req.body);
    // req.body.postId = 
    return module.exports.scheduleOrSavePosts(req, res, next);
  })
  .then(() => {
    // req.postToTwitter && dont have req.postedtwitterid = twitter failed
    // same for fb
    // this is the logic you need to figure out which message to send back
    // there are 8 possibilities:
    // twitter failed
    // twitter succeeded
    // facebook failed
    // facebook succeeded
    // twitter failed & facebook succeeded
    // etc.
    res.end();
  })
  .catch((err) => {
    console.log('error posting', err);
    res.end('err')
    //send back database error
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
  });
}


module.exports.getUserCred = (req, res, next) => {
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
      res.send(userCred);
    })
  } else {
    res.send({email: '', twitter: true, facebook: true});
  }
}
