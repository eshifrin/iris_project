import { shallow, mount } from 'enzyme';
import React from 'react';
import Calendar from '../public/src/components/Calendar.jsx'
import sinon from 'sinon'
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sampleData from '../db/sampleData.js'
import BigCalendar from 'react-big-calendar';



const posts = [sampleData.user1_scheduledPost2, sampleData.user1_scheduledPost2];


let wrapper, store

describe('should render every component', () => {
  beforeEach(()=>{
      const muiTheme = getMuiTheme();
      wrapper = mount(<Calendar scheduledPosts={posts}/>, 
                {context: {muiTheme},              
                 childContextTypes: {muiTheme: React.PropTypes.object}} 
                );
  });
  
  it('should render one Big Calendar component', () => {
    expect(wrapper.find(BigCalendar)).to.have.length(1);
  });
});