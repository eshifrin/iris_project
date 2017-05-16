import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon'
import { expect } from 'chai';
import PastPostList from '../public/src/components/PastPostList.jsx'
import PastPostListItem from '../public/src/components/PastPostListItem.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sampleData from '../db/sampleData.js'

const posts = [sampleData.user1_postedPost, sampleData.user1_postedPost];

let wrapper, store

describe('Empty past post list array', () => {
  beforeEach(() => {
      wrapper = mount(<PastPostList pastPosts={[]}/> );
  });
  
  it('should render message denoting no past posts', () => {
    expect(wrapper.contains(<h5>You have not posted any messages yet!</h5>)).to.equal(true);
  });
});

describe('When passed an array with two posted posts posts', () => {
  beforeEach(() => {
      const muiTheme = getMuiTheme();

      wrapper = mount(<PastPostList pastPosts={posts} />,
            {context: {muiTheme},              
             childContextTypes: {muiTheme: React.PropTypes.object}
            }
      );    
  });

  it('should render two PastPostListItem components ', () => {
    expect(wrapper.find(PastPostListItem)).to.have.length(2);
  });
});




