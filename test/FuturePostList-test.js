import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon'
import { expect } from 'chai';
import moxios from 'moxios'
import axios from 'axios'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FuturePostList from '../public/src/components/FuturePostList.jsx'
import FuturePostListItem from '../public/src/components/FuturePostListItem.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import sampleData from '../db/sampleData.js'

const posts = [sampleData.user1_scheduledPost2, sampleData.user1_scheduledPost2];



let wrapper, store

describe('Empty future post list array', () => {
  beforeEach(() => {
      wrapper = mount(<FuturePostList scheduledPosts={[]}/> );
  });
  
  it('should render message denoting no scheduled posts', () => {
    expect(wrapper.contains(<h5>You have not scheduled any messages yet!</h5>)).to.equal(true);
  });
});

describe('When passed future post list array with two posts', () => {
  beforeEach(() => {
      const muiTheme = getMuiTheme();

      wrapper = mount(<FuturePostList scheduledPosts={posts} />,
            {context: {muiTheme},              
             childContextTypes: {muiTheme: React.PropTypes.object}
            }
      );    
  });

  it('should render two FuturePostListItem components ', () => {
    expect(wrapper.find(FuturePostListItem)).to.have.length(2);
  });
});




