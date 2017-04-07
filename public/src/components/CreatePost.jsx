import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  // scheduleNewpost: PropTypes.func.isRequired,
  onPostSubmit: PropTypes.func.isRequired,
};

const CreatePost = ({ imgUrl, uploadImg, onPostSubmit }) => (
  <div>
    <form onSubmit={onPostSubmit}>
      <h1>Schedule New Post</h1>
      <img src={imgUrl} style={{width: 100}} />
      <WriteMessage />
      <PhotoUpload uploadImg={uploadImg} />
      <input type="submit" value="Create" />
    </form>
  </div>
);

CreatePost.propTypes = propTypes;
export default CreatePost;
