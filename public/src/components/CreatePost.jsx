import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import DateTimePicker from './DateTimePicker.jsx';
import FlatButton from 'material-ui/FlatButton';

const CreatePost = ({ postToFacebook, postToTwitter, imgUrl, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleScheduleChange, scheduledDateTime, handleResubmitClick, handleClearImg, handleResetPostFields }) => {
    var style = {
    color: 'red'
  }
  return (
  <div>
    <form onSubmit={(e) => handlePostSubmit(e)}>

      {!postToTwitter && !postToFacebook && <h4 style={style}>Please choose at least one social site to share your post</h4>}
      {(imgUrl.length !== 0) && <img src={imgUrl} style={{width: 100}} />}
      {(postToTwitter || postToFacebook) && <h4>Get ready to share!</h4>}
      <WriteMessage/>
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

const mapStateToProps = (state) => {
  console.log('state in app.jsx : ', state);
  console.log('state is logged in in app.jsx : ', state.main.isLoggedIn);
  // CONST { }
  return {
    postToTwitter: state.main.postToTwitter,
    postToFacebook: state.main.postToFacebook,
    imgUrl: state.main.imgUrl,
    scheduledDateTime: state.main.scheduledDateTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserInfo: () => {
      dispatch(getCurrentUserInfo());
    },
    modalToggle: () => {
      dispatch(modalToggle());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);