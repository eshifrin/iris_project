import React, { PropTypes } from 'react';
import PhotoUpload from './PhotoUpload.jsx';
import WriteMessage from './WriteMessage.jsx';
import DateTimePicker from './DateTimePicker.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  // scheduleNewpost: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
};

const CreatePost = ({ imgUrl, text, bgColor, uploadImg, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange }) => {
  // console.log('!!!!',imgUrl);
  return (
  <div>
    <form onSubmit={(e) => handlePostSubmit(e)}>
      <h1>Schedule New Post</h1>
      <img src={imgUrl} style={{width: 100}} />
      <WriteMessage
        text={text}
        bgColor={bgColor}
        handleTextChange={handleTextChange}
        handleLogoClick={handleLogoClick}
      />
      <DateTimePicker handleScheduleChange={handleScheduleChange}/>
      <PhotoUpload uploadImg={uploadImg} />
    </form>
      <button value="postnow" onClick={handleNowSubmit}>Post Now</button>
      <button value="schedulepost" onClick={handlePostSubmit}>Schedule Post</button>
  </div>
);
};

CreatePost.propTypes = propTypes;
export default CreatePost;
