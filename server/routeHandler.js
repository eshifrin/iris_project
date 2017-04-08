const dbh = require('../db/db_helpers');
const url = require('url');


//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const email = url_parts.query.email;

  dbh.showUserPosts(email, req.params.post_type)
  .then(results => {
    console.log(results)
    res.status(200).json(results);
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  });
}

//if authenticated, send posts
module.exports.schedulePosts = (req, res, next) => {
  //create new object appropriate for post consumption

  dbh.retrieveUserId('gary@b.com')
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