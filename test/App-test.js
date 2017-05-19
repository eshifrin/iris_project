import { shallow, mount } from 'enzyme';
import React from 'react';
import App from '../public/src/components/App.jsx'
import { mapDispatchToProps } from '../public/src/components/App.jsx'
import WriteMessage from '../public/src/components/WriteMessage.jsx'
import PhotoUpload from '../public/src/components/PhotoUpload.jsx'
import FuturePostList from '../public/src/components/FuturePostList.jsx'
import sinon from 'sinon'
import { expect } from 'chai';
import moxios from 'moxios'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as actions from '../public/src/actions/permissions.js';
import fetchMock from 'fetch-mock';
import sampleData from '../db/sampleData.js'


const initialState = {
  main: {
  isLoggedIn: true,
  twitterAuthenticated: false,
  facebookAuthenticated: false,
  postToTwitter: false,
  postToFacebook: false,
  email: 'a@b.com',
  text: '',
  img: '',
  imgUrl: '',
  scheduledPosts: [],
  pastPosts: [],
  scheduledDateTime: '',
  updatingPostId: undefined,
  newPostModal: true,
  calendarView: false,
  isLoading: false
  }
};

const initialStateNotLoggedIn = {
  main: {
  isLoggedIn: false,
  twitterAuthenticated: false,
  facebookAuthenticated: false,
  postToTwitter: false,
  postToFacebook: false,
  email: 'a@b.com',
  text: '',
  img: '',
  imgUrl: '',
  scheduledPosts: [],
  pastPosts: [],
  scheduledDateTime: '',
  updatingPostId: undefined,
  newPostModal: true,
  calendarView: true,
  isLoading: false
  }
};

/* documentation: http://airbnb.io/enzyme/ */

let wrapper, store, sandbox;

describe('should render relevant components when user is logged in', () => {
  beforeEach(() => { 
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
    wrapper = mount( <Provider store={store}><App /></Provider> );
  });
  
  it('should render one FuturePostList component when isLoggedIn is true', () => {
    expect(wrapper.find(FuturePostList)).to.have.length(1);
  });
  
  it('should dispatch TOGGLE_MODAL correctly', (done) => {
    const expectedActions = [
      { type: 'TOGGLE_MODAL' }
    ];

    store.dispatch(actions.modalToggle());

    setTimeout(() => {
      expect(store.getActions().slice(0,1)).to.deep.equal(expectedActions);
      done();
    }, 100);
  });

  it('should dispatch uploadImg correctly when stubbed - toggle, then load images, then toggle', (done) => {
    sandbox = sinon.sandbox.create();
    results =  {
      data: 'testurl'
    };
    const promise = Promise.resolve(results);
    sandbox.stub(axios, 'post').withArgs('/api/image/imgLink').returns(promise);

    const expectedSuccessActions = [
      {type: 'TOGGLE_LOADER'},
      {type: 'UPLOAD_IMG', payload: {img: null, imgUrl: 'testurl' }},
      {type: 'TOGGLE_LOADER'}
    ]

    store.dispatch(actions.uploadImg
      ({ target: { files: [null] }}))();

    setTimeout(() => {
     sandbox.restore();
     expect(store.getActions().slice(0,3)).to.deep.equal(expectedSuccessActions);
      done();
    }, 100);
  });

  it('should dispatch switchScheduledView correctly', (done) => {

    const expectedActions = [
      { type: 'SWITCH_SCHEDULED_VIEW' }
    ];

    store.dispatch(actions.switchScheduledView(
      { target: { getAttribute: () => 'calendarIcon' }}
    ));

    setTimeout(() => {
     expect(store.getActions().slice(0,1)).to.deep.equal(expectedActions);
      done();
    }, 100);
  });
});


describe('should handle posting when', () => {
  beforeEach(() => { 
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
    wrapper = mount( <Provider store={store}><App /></Provider> );
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('posting immediately', (done) => {
    sandbox = sinon.sandbox.create();
    const postPromise = Promise.resolve({});
    const postedPostsPromise = Promise.resolve({ data: ['sample post']})

    sandbox.stub(axios, 'post').withArgs('/api/user/now').returns(postPromise);
    sandbox.stub(axios, 'get').withArgs('/api/user/posted').returns(postedPostsPromise);

    const expectedPostNowActions = [
      {type: 'TOGGLE_LOADER'},
      {type: 'POST_NOW', payload: ['sample post']},
      {type: 'TOGGLE_LOADER'}
    ];

    store.dispatch(actions.handleNowSubmit());
    
    setTimeout(() => {
     console.log(store.getActions());
     expect(store.getActions().slice(0,3)).to.deep.equal(expectedPostNowActions);
      done();
    }, 500);
  });
});

describe('Map Dispatch To Props', () => {
    it('should dispatch action type TOGGLE_MODAL when modalToggle is ran', () => {
      const dispatchSpy = sinon.spy();
      const { modalToggle } = mapDispatchToProps(dispatchSpy);
      modalToggle();
      expect(dispatchSpy.args[0][0].type).to.equal('TOGGLE_MODAL')
    });

    it('should return a function when switchScheduledViewClick is run ', () => {
      const dispatchSpy = sinon.spy();
      const { switchScheduledViewClick } = mapDispatchToProps(dispatchSpy);
      switchScheduledViewClick();
      
      expect(typeof dispatchSpy.args[0][0]).to.equal('function')
    });
});

describe('should render relevant components when user is not logged in', () => {
  beforeEach(() => { 
    const mockStore = configureStore([thunk]);
    store = mockStore(initialStateNotLoggedIn);
    wrapper = mount( <Provider store={store}><App /></Provider> );
  });
  
  it('should render one description of app  when isLoggedIn is false', () => {
    expect(wrapper.contains(<p>We are a one-stop social media manager for posting to Facebook and Twitter.</p>)).to.equal(true);
  });
});

let results;
describe('should call getCurrentUserInfo upon mounting ', () => {
  beforeEach(() => { 
    sandbox = sinon.sandbox.create();
    results =  {
      data: {
            email: 'test@email.com',
            twitterAuthenticated: true,
            facebookAuthenticated: true,
            pastPosts: [],
            scheduledPosts: []
        }
    };
    const promise = Promise.resolve(results);
    sandbox.stub(axios, 'get').withArgs('/userinfo').returns(promise);


    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
    wrapper = mount( <Provider store={store}><App /></Provider> );
  });
  
  it('', (done) => {
    setTimeout(() => {
      expect(store.getActions()[0]).to.deep.equal({
        type: 'GET_USER_INFO_SUCCESS',
        payload: results
      });

      done();
    }, 100);
  });
});




