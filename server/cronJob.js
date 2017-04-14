const cron = require('node-cron');
const rh = require('./routeHandler.js');
const Promise = require('bluebird');

// cron runs the function once every minute
cron.schedule('1 * * * * *', () => {
  rh.sendScheduledPosts();
})
