import React, { PropTypes } from 'react';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {
  deletePost: PropTypes.func.isRequired,
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  postToTwitter: PropTypes.bool.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
};

const Main = ({ postToFacebook, postToTwitter, uploadImg, imgUrl, text, scheduleNewpost, deletePost, handleNowSubmit, handlePostSubmit, handleTextChange, scheduledPosts, handleLogoClick, handleScheduleChange }) => {
  return(
    <div>
      <FuturePostList scheduledPosts={scheduledPosts} deletePost={deletePost}/>
      <PastPostList />
      <CreatePost
        uploadImg={uploadImg}
        imgUrl={imgUrl}
        text={text}
        scheduleNewpost={scheduleNewpost}
        handleNowSubmit={handleNowSubmit}
        handlePostSubmit={handlePostSubmit}
        handleTextChange={handleTextChange}
        handleLogoClick={handleLogoClick}
        handleScheduleChange={handleScheduleChange}
        postToTwitter={postToTwitter}
        postToFacebook={postToFacebook}
      />
    </div>
  )
}


export default Main;
