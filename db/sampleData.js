module.exports = {
  user1: {
    email: 'gary@b.com',
    password: 'hello',
    twitter_token: '5432abc',
    facebook_token: '2923adc',
  },
  user1_scheduledPost: {
    text: 'hello fans',
    postToTwitter: true,
    postToFacebook: false,
    date: new Date(),
    status: 'scheduled'
  },
  user1_postedPost: {
    text: 'so long fans',
    postToTwitter: false,
    postToFacebook: true,
    date: new Date("2016-05-18T16:00:00Z"),
    status: 'posted'
  }
}


