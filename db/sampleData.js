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
    status: 'scheduled',
    imgUrl: 'https://previews.123rf.com/images/joshjcurtis/joshjcurtis0909/joshjcurtis090900006/5581021-Honey-Bunny-Stock-Vector.jpg'
  },
  user1_scheduledPost2: {
  text: 'take me to nap reactor',
  postToTwitter: true,
  postToFacebook: false,
  date: new Date(),
  status: 'scheduled',
  imgUrl: 'http://ichef.bbci.co.uk/wwfeatures/wm/live/624_351/images/live/p0/3d/tk/p03dtkw2.jpg'
  },
  user1_postedPost: {
    text: 'so long fans',
    postToTwitter: false,
    postToFacebook: true,
    date: new Date("2016-05-18T16:00:00Z"),
    status: 'posted',
    imgUrl: 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'
  }
}


