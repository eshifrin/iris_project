let chai = require("chai");
let expect = chai.expect;
let should = chai.should;
let chaiAsPromised = require("chai-as-promised");
// let chaiHttp = require('chai-http');
chai.use(chaiAsPromised);
// chai.use(chaiHttp);
let request = require('supertest');
let app = require('../server/index.js');
let dbh = require('../db/db_helpers.js');
const mongoose = require('mongoose');
let Promise = require('bluebird');
Promise.promisifyAll(mongoose);
let User = require('../db/models/user');
let Post = require('../db/models/post');
let httpMocks = require('node-mocks-http');
let rh = require('../server/routeHandler.js');

describe ('database testing', function(){
  before((done) => {
    let db = mongoose.createConnection(process.env.MONGODB_URI);
    User.removeAsync()
    .then(() => {
      return User({email: 'test.email'}).saveAsync()
    })
    .then(() => {
      done();
    })
  })



  describe('pure database example: still has all the user fields', () => {
    let testUser;
    before((done) => {
      User.findOneAsync({email: 'test.email'})
      .then((user) => {
        expect(user.email).to.equal('test.email')
        testUser = user;
        done();
      })
      .catch(done)
    })  

    let user_fields = [
      'email', 'twitter_token', 'twitter_secret', 'facebook_token',
      'facebook_id', 'scheduled', 'posted'
    ];

    user_fields.forEach(field => {
      it (`User should have a ${field} field`, () => {
        expect(testUser[field]).to.not.equal(undefined);
      })
    })
  })

  describe('database helper and server examples ', () => {
    before ((done) => {
      dbh.updateUserTwitter({
        email: 'test.email', 
        token: 'twittertoken123', 
        tokenSecret: 'twittersecret123'
      })
      .then(() => done());
    });

    it('Retrieval works after an update', (done) => {
      dbh.getUser('test.email')
      .then((user) => {
        expect(user.twitter_token).to.equal('twittertoken123')
        done();
      })
      .catch(done)
    });

    it('Server should respond with nothing without session', (done) => {
      request(app)
      .get('/userinfo')
      .then((res) => {
        expect(res.body.email).to.equal('');  
        expect(res.body.twitter).to.equal(false);  
        expect(res.body.facebook).to.equal(false);  
        done();      
      })
      .catch(done)
    });

    it('Server should respond with user\s info with correct session data', (done) => {
      let req = httpMocks.createRequest({
        method: 'get',
        url: '/userinfo',
        user: 'testuser',
        session: {
          email: 'test.email'
        }
      });

      let res = httpMocks.createResponse();
      rh.getUserInfo(req, res)
      setTimeout(() => {
        var data = res._getData();
        expect(data.email).to.equal('test.email')
        expect(data.twitter).to.equal(true)
        expect(data.facebook).to.equal(false)
        done()
      }, 1000)
      // done();
    });
  });
});



