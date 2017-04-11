<<<<<<< HEAD
const cron = require('node-cron');
const dbh = require('./../db/db_helpers.js')
const rh = require('./routeHandler.js');
 
cron.schedule('*/2 * * * * *', () => {
    // get posts less than or equal to current time
    let currentDateTime = new Date().toISOString();
    return dbh.checkScheduledEvent(currentDateTime)
    .then(data => {
      console.log('here are the avail posts', data)
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


||||||| merged common ancestors
=======
const cron = require('node-cron');
const dbh = require('./../db/db_helpers.js')
const rh = require('./routeHandler.js');
 
cron.schedule('*/2 * * * * *', () => {
    // get posts less than or equal to current time
    let currentDateTime = new Date().toISOString();
    return dbh.checkScheduledEvent(currentDateTime)
    .then(data => {
      console.log('here are the avail posts', data)
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
    // remove from user's scheduled -> posted
    // remove from posts's scheduled -> postedObject.keys(x).sort((a, b) => x[b] - x[a]);
});


>>>>>>> Add cron job to get post before or equal to current time
