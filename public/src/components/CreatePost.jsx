import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import DateTimePicker from './DateTimePicker.jsx';
import FlatButton from 'material-ui/FlatButton';


const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // scheduleNewpost: PropTypes.func.isRequired,
  postToTwitter: PropTypes.bool.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleFbLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
  handleResubmitClick: PropTypes.func.isRequired,
  handleClearImg: PropTypes.func.isRequired,
  handleResetPostFields: PropTypes.func.isRequired,
  handleTwLogoClick: PropTypes.func.isRequired,
};

const CreatePost = ({ postToFacebook, postToTwitter, imgUrl, text, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleFbLogoClick, handleTwLogoClick, handleScheduleChange, scheduledDateTime, handleResubmitClick, handleClearImg, handleResetPostFields }) => {
    var style = {
    color: 'red'
  }
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
        handleFbLogoClick={handleFbLogoClick}
        handleTwLogoClick={handleTwLogoClick}
      />
      <DateTimePicker handleScheduleChange={handleScheduleChange} scheduledDateTime={scheduledDateTime}/>
      <PhotoUpload
        uploadImg={uploadImg}
        handleClearImg={handleClearImg}
      />
    </form>
      <FlatButton primary={true} onClick={handleResetPostFields}>Reset Fields</FlatButton>
      <FlatButton primary={true} value="postnow" onClick={(postToFacebook || postToTwitter) && handleNowSubmit}>Post Now</FlatButton>
      <FlatButton primary={true} value="schedulepost" onClick={(postToFacebook || postToTwitter) && handlePostSubmit}>Schedule Post</FlatButton>
      {!postToTwitter && !postToFacebook && <h5 style={style}>Please choose at least one social site to share your post</h5>}
  </div>
)};

CreatePost.propTypes = propTypes;
export default CreatePost;
