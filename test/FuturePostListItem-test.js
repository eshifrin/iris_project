import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon'
import { expect } from 'chai';
import FuturePostListItem from '../public/src/components/FuturePostListItem.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import sampleData from '../db/sampleData.js'
import FlatButton from 'material-ui/FlatButton';





/* documentation: http://airbnb.io/enzyme/ */

let wrapper, store, deletePost, editPost;

describe('Empty future post list array', () => {
  beforeEach(() => {
    editPost = sinon.spy();
    deletePost = sinon.spy();

    const muiTheme = getMuiTheme();

    wrapper = mount(
      <FuturePostListItem 
        post={sampleData.user1_scheduledPost2} 
        deletePost={deletePost}
        editPost={editPost}
      />,
          {context: {muiTheme},              
           childContextTypes: {muiTheme: React.PropTypes.object}
          }
    );    
  });
  
  it('should render 1 CardText components for every post', () => {
    expect(wrapper.find(CardText)).to.have.length(1);
  });

  it('should render 4 FlatButton components for every post', () => {
    expect(wrapper.find(FlatButton)).to.have.length(4);
  });

  it('should call the correct click handlers for editing and deleting posts', () => {
    wrapper.find('#deletePost').simulate('click');
    wrapper.find('#editPost').simulate('click');
    expect(deletePost).to.have.property('callCount', 1);
    expect(editPost).to.have.property('callCount', 1);
  });

});




