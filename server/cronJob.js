const cron = require('node-cron');
const dbh = require('./../db/db_helpers.js')
const rh = require('./routeHandler.js');
const User = require('./../db/models/user')
const moment = require('moment');

cron.schedule('1 * * * * *', () => {
    // get posts less than or equal to current time
    let socialMediaReqObj = {};
    let currentDateTime = moment(new Date()).utc().toISOString();
    console.log('in cron, whats the currentDT', currentDateTime);
    let postIds = [];
    return dbh.checkScheduledEvent(currentDateTime)
    .then(data => {
      console.log('what are the outstanding?', data);
      return User.findAsync({'_id': data[0].user_id})
      .then(userObj => {
        socialMediaReqObj = {
          body: {
            text: data[0].text,
            postToFacebook: data[0].postToFacebook,
            postToTwitter: data[0].postToTwitter
          },
          session: {
            email: userObj[0].email
          },
          scheduledPostIds: [data[0]._id]
        }
        return socialMediaReqObj;
      })
      .then(socialMediaReqObj => {
        console.log('log socialMediaReqObj', socialMediaReqObj);
        return rh.sendPostsNow(socialMediaReqObj);
      })
      .then(success => {
        postIds.push(data._id);
        // TODO:
        // if success message, insert twitter ID
        console.log('IDs!!!!', postIds);
        console.log('success message', success);
      })
    })
    .catch(err => {
      console.log('error', err)
    })
    // // send posts now if there's any scheduled post
    // if (availableScheduledPosts.length > 0) {
    //   rh.sendPostNow(availableScheduledPosts);
    // } else {
    //   console.log('No available post to send.');
    // }
    // TODO:
    // get sent posts IDs and user ID
    // change status from user's scheduled -> posted
    // remove from posts's scheduled -> postedObject.keys(x).sort((a, b) => x[b] - x[a]);
});



