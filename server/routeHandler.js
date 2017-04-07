const dbh = require('../db/db_helpers')

//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
  dbh.showUserPosts('gary@b.com', req.params.post_type)
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
  dbh.retrieveUserId('gary@b.com')
  .then(id => {
    return dbh.savePost(id, req.body)
  })
  .then(() => {
    res.status(200).end();
  })
  .catch(err => {
    if (err === 'invalid user') res.status(404).end();
    else res.status(500).end();
  })
}