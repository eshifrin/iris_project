import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import DateTimePicker from './DateTimePicker.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // scheduleNewpost: PropTypes.func.isRequired,
  postToTwitter: PropTypes.bool.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
};

<<<<<<< HEAD
const CreatePost = ({ postToFacebook, postToTwitter, imgUrl, text, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange }) => {
  // console.log('!!!!',imgUrl);
  var style = {
    color: 'red'
  }
||||||| merged common ancestors
const CreatePost = ({ postToFacebook, postToTwitter, imgUrl, text, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange }) => {
  // console.log('!!!!',imgUrl);
=======
const CreatePost = ({ postToFacebook, postToTwitter, imgUrl, text, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange, scheduledDateTime }) => {
>>>>>>> Fix date-time picker storage and auto-post twitter feeds
  return (
  <div>
    <form onSubmit={(e) => handlePostSubmit(e)}>
      <h4>Schedule New Post</h4>
      <img src={imgUrl} style={{width: 100}} />
      <WriteMessage
        text={text}
        postToTwitter={postToTwitter}
        postToFacebook={postToFacebook}
        handleTextChange={handleTextChange}
        handleLogoClick={handleLogoClick}
      />
      <DateTimePicker handleScheduleChange={handleScheduleChange} scheduledDateTime={scheduledDateTime}/>
      <PhotoUpload uploadImg={uploadImg} />
    </form>
      <button value="postnow" onClick={(postToFacebook || postToTwitter) && handleNowSubmit}>Post Now</button>
      <button value="schedulepost" onClick={(postToFacebook || postToTwitter) && handlePostSubmit}>Schedule Post</button>
      {!postToTwitter && !postToFacebook && <h5 style={style}>Please choose at least one social site to share your post</h5>}
  </div>
)};

CreatePost.propTypes = propTypes;
export default CreatePost;
