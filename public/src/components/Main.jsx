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
  scheduledDateTime: PropTypes.instanceOf(Date),
  editPost: PropTypes.func.isRequired,
  handleResubmitClick: PropTypes.func.isRequired,
  handleClearImg: PropTypes.func.isRequired,
  handleResetPostFields: PropTypes.func.isRequired,
};

const Main = ({ editPost, postToFacebook, postToTwitter, uploadImg, imgUrl, text, scheduleNewpost, deletePost, handleNowSubmit, handlePostSubmit, handleTextChange, scheduledPosts, handleLogoClick, handleScheduleChange, pastPosts, scheduledDateTime, handleResubmitClick, handleClearImg, handleResetPostFields }) => {
  return(
    <div>
      <FuturePostList scheduledPosts={scheduledPosts} deletePost={deletePost} editPost={editPost}/>
      <PastPostList pastPosts={pastPosts} handleResubmitClick={handleResubmitClick}/>
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
        scheduledDateTime={scheduledDateTime}
        handleResubmitClick={handleResubmitClick}
        handleClearImg={handleClearImg}
        handleResetPostFields={handleResetPostFields}
      />
    </div>
  )
}

export default Main;
