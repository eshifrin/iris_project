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
      
      {!postToTwitter && !postToFacebook && <h4 style={style}>Please choose at least one social site to share your post</h4>}
      {(imgUrl.length !== 0) && <img src={imgUrl} style={{width: 100}} />}
      {(postToTwitter || postToFacebook) && <h4>Get ready to share!</h4>}
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
      { (postToFacebook || postToTwitter) &&  <FlatButton primary={true} value="postnow" onClick={handleNowSubmit}>Post Now</FlatButton> }
      { (postToFacebook || postToTwitter) &&<FlatButton primary={true} value="schedulepost" onClick={handlePostSubmit}>Schedule Post</FlatButton> }
      
  </div>
)};

CreatePost.propTypes = propTypes;
export default CreatePost;
