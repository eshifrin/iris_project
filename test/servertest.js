var expect = require('chai').expect;
var request = require('request');
var httpMocks = require('node-mocks-http');

var app = require('../server/index.js');
var db = require('../db/db_config.js');
var dbh = require('../db/db_helpers.js');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const Post = require('../db/models/post');
const User = require('../db/models/user');
Promise.promisifyAll(mongoose);


// User({email: 'hello'}).save();

describe ('', function(){
  beforeEach((done) => {
    return db.dropDatabaseAsync()
    .then((stuff) => {
      console.log('in here', stuff)
      return User({email: 'hello'}).saveAsync()
    })
    .then(() => {
      console.log('did the things')
      done();
    })
    .catch(err => console.log(err))
  })
});


describe ('', function(){
  it('cant get anything to run', function() {
    expect(true).to.equal(true);
  })
  beforeEach((done) => {
    return db.dropDatabaseAsync()
    .then((stuff) => {
      console.log('in here', stuff)
      return User({email: 'hello'}).saveAsync()
    })
  //   .then(() => {
  //     console.log('did the things')
  //     done();
  //   })
  //   .catch(err => console.log(err))
  // })
});

