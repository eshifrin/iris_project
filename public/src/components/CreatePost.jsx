import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import Loader from './Loader.jsx';
import FlatButton from 'material-ui/FlatButton';
import 'react-widgets/lib/less/react-widgets.less';
import DTP from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { yellow800 } from 'material-ui/styles/colors';
momentLocalizer(moment);

import { handleScheduleChange,
        uploadImg,
        handleClearImg,
        handleResetPostFields,
        handleNowSubmit,
        handlePostSubmit } from '../actions/permissions';

class CreatePost extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', maxHeight: 'none ! important' }}>
        <div style={{ fontWeight: 'bold', color: '#F9A825', fontSize: '200%' }}>
          share
          {this.props.isLoading ? <Loader /> : null}
        </div>
        <div style={{ width: '75%', textAlign: 'center', display: 'inline-block', marginTop: '5px' }}>
          <DTP
            defaultValue={this.props.scheduledDateTime ? new Date(this.props.scheduledDateTime) : new Date()}
            min={new Date()}
            onChange={this.props.handleScheduleChange}
          />
        </div>

        <WriteMessage />

        <div style={{ height: '175' }}>
          <PhotoUpload
            uploadImg={this.props.uploadImg}
            imgUrl={this.props.imgUrl}
            handleClearImg={this.props.handleClearImg}
          />
        </div>

        <div>
          <hr />

          <div style={{ textAlign: 'center', display: 'inline-block' }} >
            { (this.props.postToFacebook || this.props.postToTwitter) && <FlatButton primary value="postnow" onClick={this.props.handleNowSubmit} style={{color: yellow800}}>post now</FlatButton> }
            { (this.props.postToFacebook || this.props.postToTwitter) && <FlatButton primary value="schedulepost" onClick={this.props.handlePostSubmit} style={{color: yellow800}}>schedule post</FlatButton> }
            {!this.props.postToTwitter && !this.props.postToFacebook && <h4 style={{ color: 'red' }}>please choose at least one social site to share your post</h4>}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  postToTwitter: state.main.postToTwitter,
  postToFacebook: state.main.postToFacebook,
  imgUrl: state.main.imgUrl,
  scheduledDateTime: state.main.scheduledDateTime,
  isLoading: state.main.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleScheduleChange: (e) => {
    dispatch(handleScheduleChange(e));
  },
  uploadImg: (e) => {
    dispatch(uploadImg(e));
  },
  handleClearImg: () => {
    dispatch(handleClearImg());
  },
  handleNowSubmit: () => {
    dispatch(handleNowSubmit('now'));
  },
  handlePostSubmit: () => {
    dispatch(handlePostSubmit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
