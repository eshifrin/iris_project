import { shallow, mount } from 'enzyme';
import React from 'react';
import Main from '../public/src/components/Main.jsx'
import App from '../public/src/components/App.jsx'
import WriteMessage from '../public/src/components/WriteMessage.jsx'
import PhotoUpload from '../public/src/components/PhotoUpload.jsx'
import FuturePostList from '../public/src/components/FuturePostList.jsx'
import NavBar from '../public/src/components/NavBar.jsx'
import sinon from 'sinon'
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import moxios from 'moxios'
import axios from 'axios'

/* documentation: http://airbnb.io/enzyme/ */


describe('how to check immediate child components existing', () => {
  it('should render one <FuturePostList /> component', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(FuturePostList)).to.have.length(1);
  });
});

describe('seeing a deeply nested component', () => {
  it('will render a FuturePostList if App is rendered', () => {
    const wrapper = mount(<App />);
    //so we can see deep into Main
    wrapper.setState({ isLoggedIn: true });
    //use the below if you want to see html representation of all the of code
    // console.log(wrapper.debug());
    expect(wrapper.find('FuturePostList')).to.have.length(1);
  })
});

describe('how to test if functions were called', () => {
  it('should call handleFBClick when the logo is clicked', () => {
    const handleFbLogoClick = sinon.stub();
    const muiTheme = getMuiTheme();
    //the context and childcontexttypes arent necesary if you are doing a shallow render
    const wrapper = 
      mount(<WriteMessage handleFbLogoClick={handleFbLogoClick} />,
            {context: {muiTheme},              
             childContextTypes: {muiTheme: React.PropTypes.object}});
    wrapper.find('.sendToFB').simulate('click');
    expect(handleFbLogoClick.called).to.equal(true);
  });
});

describe('how to test state changes', () => {
  it('should change postToFacebook from false to true on simulated handleFbLogoClick', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('postToFacebook')).to.equal(false);
    wrapper.instance().handleFbLogoClick()
    expect(wrapper.state('postToFacebook')).to.equal(true);
  });
});


// describe('testing nested click events in nested components affecting state', () => {
//   it('should change postToFacebook from false to true on actual handleFbLogoClick', () => {
//     const wrapper = mount(<App />);
//     wrapper.setState({ isLoggedIn: true });
//     wrapper.setState({ newPostModal: true });
//     expect(wrapper.state('postToFacebook')).to.equal(false)
//     wrapper.find('.sendToFB').simulate('click');
//     expect(wrapper.state('postToFacebook')).to.equal(true)
//   });
// });

describe('testing stubbed axios requests', () => {
    it('should get email on componentWillMount', () => {
      let results = {data: {email: 'hello@yo.com', twitter: true, facebook: true}};
      const promise = Promise.resolve(results);
      sinon.stub(axios, 'get').withArgs('/userinfo').returns(promise);
      let wrapper = mount(<App />);
      promise.then(() => {
        expect(wrapper.state().email).to.equal('hello@yo.com');
        expect(wrapper.state().twitterAuthenticated).to.equal(true);
      });
    })
});




