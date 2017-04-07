import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired
};

const CreatePost = props => (
  <div>
    <img src={props.imgUrl} style={{width: 100}} />
    <PhotoUpload uploadImg={props.uploadImg}/> 
  </div>
);


export default CreatePost;
