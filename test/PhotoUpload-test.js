import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon'
import { expect } from 'chai';
import PhotoUpload from '../public/src/components/PhotoUpload.jsx'


let wrapper, handleClearImg, uploadImg;

describe('should render PhotoUpload correctly with an image passedIn', () => {
  beforeEach(() => { 
    handleClearImg = sinon.spy();
    wrapper = shallow(<PhotoUpload handleClearImg={handleClearImg} imgUrl={true}/>);
  });
  
  it('should call handleClearImg when the clear FlatButton is clicked', () => {
    wrapper.find('#clearImage').simulate('click');
    expect(handleClearImg).to.have.property('callCount', 1);
  });
  
});

describe('should render PhotoUpload correctly with no image passed in', () => {
  beforeEach(() => { 
    uploadImg = sinon.spy();
    wrapper = shallow(
      <PhotoUpload 
        handleClearImg={handleClearImg} 
        imgUrl={false} 
        uploadImg={uploadImg}
      />);
  });
  
  it('should call uploadImg when an image is uploaded', () => {
    wrapper.find('#uploadImage').simulate('change');
    expect(uploadImg).to.have.property('callCount', 1);
  });
});