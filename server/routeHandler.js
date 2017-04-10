const dbh = require('../db/db_helpers');
const url = require('url');
const tw = require('./twitter.js')

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
module.exports.schedulePosts = (req, res, next) => {
  dbh.retrieveUserId(req.body.email)
  .then(id => {
    return dbh.savePost(id, req.body, 'scheduled')
  })
  .then(() => {
    res.status(200).end();
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  })
}

module.exports.sendPostNow = (req, res, next) => {
  //retrieve user info incl keys, might not exist?
  //create client in twitter, error possible here
    //make a post in twitter, another error
      //send 200

  let email = req.body.email
  console.log(tw)
  return dbh.userExists(email)
  .then(data => {
    if (!data) throw 'invalid user'
    else return tw.populateClient(data.twitter_token, data.twitter_secret)
  })
  .then(client => {
    //need to populate actual message here from req
    tw.tweet(client, req.body.text)
  })
  .catch(err => {
    console.log('error somewhere in sendpostnow', err)
  })
}


module.exports.userCheck = (req, res, next) => {
  let email = req.user.displayName
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
  })
}