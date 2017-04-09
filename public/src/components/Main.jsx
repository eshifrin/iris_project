import React, { PropTypes } from 'react';
import Register from './Register.jsx';
import Connect from './Connect.jsx';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};

const Main = ({ uploadImg, imgUrl, text, scheduleNewpost, handlePostSubmit, handleTextChange, scheduledPosts }) => (
  <div>
    <Register />
    <Connect />
    <FuturePostList scheduledPosts={scheduledPosts}/>
    <PastPostList />
    <CreatePost
      uploadImg={uploadImg}
      imgUrl={imgUrl}
      text={text}
      scheduleNewpost={scheduleNewpost}
      handlePostSubmit={handlePostSubmit}
      handleTextChange={handleTextChange}
    />
  </div>
);

export default Main;
