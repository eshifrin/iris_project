cron.schedule('*/2 * * * * *', () => {
    // get posts less than or equal to current time
    let socialMediaReqObj = {};
    let currentDateTime = new Date().toUTCString();
    let postIds = [];
    return dbh.checkScheduledEvent(currentDateTime)
    .then(data => {
      console.log('what are the outstanding?', data);
      return User.findAsync({'_id': data[0].user_id})
      .then(userObj => {
        console.log('what userObj?', userObj);
        socialMediaReqObj = {
          body: {
            text: data[0].text,
            postToFacebook: data[0].postToFacebook,
            postToTwitter: data[0].postToTwitter
          },
          session: {
            email: userObj[0].email
          }
        }
        return socialMediaReqObj;
      })
      .then(socialMediaReqObj => {
        // TODO: 
        // check if FB id is null, if is, post to FB;
        // check if TW id is null, if is, post to TW;
        // if both are null, post to both
        // rh.sendPostsNow(socialMediaReqObj);
        return rh.sendTwitterNow(socialMediaReqObj);
        // rh.sendFacebookNow(socialMediaReqObj);
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
