const dbh = require('../db/db_helpers');
const url = require('url');
const sm = require('./socialmedia.js')

//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;

  dbh.showUserPosts(email, req.params.post_type)
  .then(results => {
    console.log('getting user posts', results);
    res.status(200).json(results);
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  });
}

//if authenticated, send posts
module.exports.scheduleOrSavePosts = (req, res, next) => {
  dbh.retrieveUserId(req.body.email)
  .then(id => {
    return dbh.savePost(id, req.body, req.body.status || 'scheduled')
  })
  .then(() => {
    res.status(200).end();
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  })
}



module.exports.sendFacebookNow = (req, res, next) => {
  let email = req.body.email;
  let message = req.body.text;

  return dbh.userExists(email)
  .then(data => {
    if (!data) throw 'invalid user'
    else return sm.facebookPost(data.facebook_id, data.facebook_token, message);
  })
  .then(fbpost => {
    req.body.postedFacebookId = fbpost.data.id;
    return 'Facebook Successful'
  });
}




module.exports.sendTwitterNow = (req, res, next) => {
  console.log('in twitter now')
  let email = req.body.email
  return dbh.userExists('e@f.com')
  .then(data => {
    if (!data) throw 'invalid user';
    else return sm.populateTwitterClient(data.twitter_token, data.twitter_secret);
  })
  .then(client => {
    return sm.tweet(client, req.body.text)
  })
  .then(tweet => {
    req.body.postedTwitterId = tweet.id;
    return 'Twitter Sucessful'
  });
};

module.exports.sendPostsNow = (req, res, next) => {
  let posts = [];
  if (req.body.postToFacebook) posts.push(module.exports.sendFacebookNow(req, res, next));
  if (req.body.postToTwitter) posts.push(module.exports.sendTwitterNow(req, res, next));

  Promise.all(posts)
  .then(postResults => {
    req.body.status = 'posted';
    return module.exports.scheduleOrSavePosts(req, res, next);
  })
  .then(() => {
    res.end();
  })
  //need to figure out error handling???
  .catch(console.log);
}


module.exports.userCheck = (req, res, next) => {
  let email = req.user.displayName;
  return dbh.userExists(email)
  .then(data => {
    if (!data) return dbh.saveUser(email)
    else return
  })
  .then(() => {
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

  return dbh.retrieveUserId(req.user.displayName)
  .then(userId => {
    return dbh.deletePost(userId, postId)
  })
  .then(results => {
    console.log('deletedPost in routehandler', results);
    res.end()
  })
  .catch(err => {
    console.log('err in routehandler', err);
  })

  //delete it from users array, if successful delete from posts
  //user will then refresh array

  //grab post id, delete it from that user's posts
    //if doesnt exist throw that error
  //then go delete it from post array
  
  //#1) how to delete from array
  //#2) how to delete an entry






}