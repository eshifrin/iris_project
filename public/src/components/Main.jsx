import React, { PropTypes } from 'react';
import Register from './Register.jsx';
import Connect from './Connect.jsx';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
};

const Main = ({ uploadImg, imgUrl, message, scheduleNewpost, handlePostSubmit, handleMessageChange }) => (
  <div>
    <Register />
    <Connect />
    <FuturePostList />
    <PastPostList />
    <CreatePost
      uploadImg={uploadImg}
      imgUrl={imgUrl}
      message={message}
      scheduleNewpost={scheduleNewpost}
      handlePostSubmit={handlePostSubmit}
      handleMessageChange={handleMessageChange}
    />
  </div>
);

export default Main;
