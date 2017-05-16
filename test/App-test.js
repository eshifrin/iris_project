import { shallow, mount } from 'enzyme';
import React from 'react';
import App from '../public/src/components/App.jsx'
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






/* documentation: http://airbnb.io/enzyme/ */

let wrapper, store

describe('should render every component', () => {
  beforeEach(() => { 
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
    wrapper = mount( <Provider store={store}><App /></Provider> );
  });
  
  it('should render one FuturePostList component when isLoggedIn is true', () => {
    expect(wrapper.find(FuturePostList)).to.have.length(1);
  });
  
  it('should dispatch actions correctly', (done) => {
    const expectedActions = [
      { type: 'TOGGLE_MODAL' }
    ];

    store.dispatch(actions.modalToggle());

    setTimeout(() => {
      expect(store.getActions().slice(0,1)).to.deep.equal(expectedActions);
      done();
    }, 100);
  });

});




  // it('should render one PhotoUpload component when newPostModal is true', () => {
  //   expect(wrapper.find(PhotoUpload)).to.have.length(1);
  // });
    // it('should dispatch events appropriately', (done) => {
    //   return store.dispatch({
    //     type: 'GET_USER_INFO_SUCCESS',
    //     payload: loggedInUserState
    //   }).then(() => {
    //     console.log(store.getState());
    //     done();
    //   })
    //   // .then(() => {
    //     console.log(store.getActions())
    //     // expect(wrapper.find(FuturePostList)).to.have.length(1);
    //     done();
    // })


    // it('should render one <FuturePostList /> component', () => {
    //   expect(wrapper.find(FuturePostList)).to.have.length(1);
    // });


// });

// describe('Tests involving App without requests', () => {
//   var userInfoStub;

//   before(function() {
//     let results = {data: {email: '', twitter: false, facebook: false}};
//     const promise = Promise.resolve(results);
//     userInfoStub = sinon.stub(axios, 'get').withArgs('/userinfo')
//     userInfoStub.returns(promise);
//   });

//   after(function() {
//     axios.get.restore();
//   });

//   it('will render a FuturePostList if App is rendered', () => {
//     const wrapper = mount(<App />);
//     //so we can see deep into App
//     wrapper.setState({ isLoggedIn: true });
//     //use the below if you want to see html representation of all the of code
//     // console.log(wrapper.debug());
//     expect(wrapper.find('FuturePostList')).to.have.length(1);
//   });


//   it('should change postToFacebook from false to true on simulated handleFbLogoClick', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.state('postToFacebook')).to.equal(false);
//     wrapper.instance().handleFbLogoClick()
//     expect(wrapper.state('postToFacebook')).to.equal(true);
//   });

//   // expecting refactor post Redux - doesnt work due to modal
//   // it('should change postToFacebook from false to true on actual handleFbLogoClick', () => {
//   //   const wrapper = mount(<App />);
//   //   wrapper.setState({ isLoggedIn: true });
//   //   wrapper.setState({ newPostModal: true });
//   //   expect(wrapper.state('postToFacebook')).to.equal(false);
//   //   wrapper.find('.sendToFB').simulate('click');
//   //   expect(wrapper.state('postToFacebook')).to.equal(true);
//   // });

// })


// describe('how to test if functions were called', () => {
//   it('should call handleFBClick when the logo is clicked', () => {
//     const handleFbLogoClick = sinon.stub();
//     const muiTheme = getMuiTheme();
//     //the context and childcontexttypes arent necesary if you are doing a shallow render
//     const wrapper = 
//       mount(<WriteMessage handleFbLogoClick={handleFbLogoClick} />,
//             {context: {muiTheme},              
//              childContextTypes: {muiTheme: React.PropTypes.object}});
//     wrapper.find('.sendToFB').simulate('click');
//     expect(handleFbLogoClick.called).to.equal(true);
//   });
// });


// describe('testing stubbed axios requests', () => {
//     it('should get email on componentWillMount', () => {
//       let results = {data: {email: 'hello@yo.com', twitter: true, facebook: true}};
//       const promise = Promise.resolve(results);
//       sinon.stub(axios, 'get').withArgs('/userinfo').returns(promise);

//       let wrapper = mount(<App />);
//       promise.then(() => {
//         expect(wrapper.state().email).to.equal('hello@yo.com');
//         expect(wrapper.state().twitterAuthenticated).to.equal(true);
//       });
//     });
// });




