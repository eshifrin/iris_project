const dbh = require('../db/db_helpers')

//if authenticated, send posts
module.exports.sendUserPosts = (req, res, next) => {
    //extract type of post and email
    dbh.showUserPosts('gary@b.com', 'posted')
    .then(e => {
      res.status(200).json(e);
    })
    .catch(err => {
      if (err === 'invalid user') res.status(404).end();
      else res.status(500).end();
    });
}