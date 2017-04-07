import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired
};

const CreatePost = ({ imgUrl, uploadImg }) => (
  <div>
    <form>
      <h1>Schedule New Post</h1>
      <img src={imgUrl} style={{width: 100}} />
      <PhotoUpload uploadImg={uploadImg}/> 
      <input type="submit" value="Create"/>
    </form>
  </div>
);

export default CreatePost;
