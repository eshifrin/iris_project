import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import DateTimePicker from './DateTimePicker.jsx';
import FlatButton from 'material-ui/FlatButton';
import { handleScheduleChange, uploadImg, handleClearImg, handleResetPostFields, handleNowSubmit, handlePostSubmit } from '../actions/permissions';

class CreatePost extends React.Component {
    render() {
    var style = {
      color: 'red'
    }
    return (
    <div>
      <form>
        {!this.props.postToTwitter && !this.props.postToFacebook && <h4 style={style}>Please choose at least one social site to share your post</h4>}
        {(this.props.imgUrl.length !== 0) && <img src={this.props.imgUrl} style={{width: 100}} />}
        {(this.props.postToTwitter || this.props.postToFacebook) && <h4>Get ready to share!</h4>}
        <WriteMessage/>
        <DateTimePicker handleScheduleChange={this.props.handleScheduleChange.bind(this)} scheduledDateTime={this.props.scheduledDateTime}/>
        <PhotoUpload
          uploadImg={this.props.uploadImg}
          handleClearImg={this.props.handleClearImg}
        />
      </form>
        <FlatButton primary={true} onClick={this.props.handleResetPostFields}>Reset Form</FlatButton>
        { (this.props.postToFacebook || this.props.postToTwitter) &&  <FlatButton primary={true} value="postnow" onClick={this.props.handleNowSubmit}>Post Now</FlatButton> }
        { (this.props.postToFacebook || this.props.postToTwitter) &&<FlatButton primary={true} value="schedulepost" onClick={this.props.handlePostSubmit}>Schedule Post</FlatButton> }

    </div>
  )}
};

const mapStateToProps = (state) => {
  return {
    postToTwitter: state.main.postToTwitter,
    postToFacebook: state.main.postToFacebook,
    imgUrl: state.main.imgUrl,
    scheduledDateTime: state.main.scheduledDateTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleScheduleChange: (e) => {
      dispatch(handleScheduleChange(e));
    },
    uploadImg: (e) => {
      dispatch(uploadImg(e));
    },
    handleClearImg: () => {
      dispatch(handleClearImg());
    },
    handleResetPostFields: () => {
      dispatch(handleResetPostFields());
    },
    handleNowSubmit: () => {
      dispatch(handleNowSubmit('now'));
    },
    handlePostSubmit: () => {
      dispatch(handlePostSubmit());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);