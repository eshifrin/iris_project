import React, { PropTypes } from 'react';
import Register from './Register.jsx';
import Connect from './Connect.jsx';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {
  deletePost: PropTypes.func.isRequired,
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
};

const Main = ({ uploadImg, imgUrl, text, bgColor, scheduleNewpost, deletePost, handleNowSubmit, handlePostSubmit, handleTextChange, scheduledPosts, handleLogoClick, handleScheduleChange }) => {
  return(
    <div>
      <Register />
      <Connect />
      <FuturePostList scheduledPosts={scheduledPosts} deletePost={deletePost}/>
      <PastPostList />
      <CreatePost
        uploadImg={uploadImg}
        imgUrl={imgUrl}
        text={text}
        bgColor={bgColor}
        scheduleNewpost={scheduleNewpost}
        handleNowSubmit={handleNowSubmit}
        handlePostSubmit={handlePostSubmit}
        handleTextChange={handleTextChange}
        handleLogoClick={handleLogoClick}
        handleScheduleChange={handleScheduleChange}
      />
    </div>
  )
}

export default Main;
