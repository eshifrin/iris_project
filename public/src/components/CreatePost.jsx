import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  // scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
};

const CreatePost = ({ imgUrl, message, uploadImg, handlePostSubmit, handleMessageChange }) => (
  <div>
    <form onSubmit={(e) => handlePostSubmit(e)}>
      <h1>Schedule New Post</h1>
      <img src={imgUrl} style={{width: 100}} />
      <WriteMessage
        message={message}
        handleMessageChange={handleMessageChange}
      />
      <PhotoUpload uploadImg={uploadImg} />
      <input type="submit" value="Create" />
    </form>
  </div>
);

CreatePost.propTypes = propTypes;
export default CreatePost;
