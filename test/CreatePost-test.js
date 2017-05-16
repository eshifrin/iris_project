import { shallow, mount } from 'enzyme';
import React from 'react';
import PhotoUpload from '../public/src/components/PhotoUpload.jsx'
import CreatePost from '../public/src/components/CreatePost.jsx'
import WriteMessage from '../public/src/components/WriteMessage.jsx'

import sinon from 'sinon'
import { expect } from 'chai';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const initialState = {
  main: {
    postToTwitter: true,
    postToFacebook: true,
    imgUrl: '',
    scheduledDateTime: new Date(),
    isLoading: true
  }
}

let wrapper, store

describe('should render every component', () => {
  beforeEach(()=>{
      const muiTheme = getMuiTheme();
      const mockStore = configureStore([thunk]);
      store = mockStore(initialState);
      wrapper = mount( <Provider store={store}><CreatePost /></Provider>, 
                {context: {muiTheme},              
                 childContextTypes: {muiTheme: React.PropTypes.object}} 
                );
  });
  
  it('should render one PhotoUpload component', () => {
    expect(wrapper.find(PhotoUpload)).to.have.length(1);
  });

  it('should render one WriteMessage component', () => {
    expect(wrapper.find(WriteMessage)).to.have.length(1);
  });




});