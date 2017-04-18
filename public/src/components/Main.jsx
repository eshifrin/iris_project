import React, { PropTypes } from 'react';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
  handleFbLogoClick: PropTypes.func.isRequired,
  handleScheduleChange: PropTypes.func.isRequired,
  scheduledDateTime: PropTypes.instanceOf(Date),
  editPost: PropTypes.func.isRequired,
  handleResubmitClick: PropTypes.func.isRequired,
  handleClearImg: PropTypes.func.isRequired,
  handleResetPostFields: PropTypes.func.isRequired,
  handleTwLogoClick: PropTypes.func.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
  newPostModal: PropTypes.bool.isRequired,

};



const Main = ({ handleModalToggle, newPostModal, editPost, postToFacebook, postToTwitter, uploadImg, imgUrl, text, scheduleNewpost, deletePost, handleNowSubmit, handlePostSubmit, handleTextChange, scheduledPosts, handleFbLogoClick, handleScheduleChange, pastPosts, scheduledDateTime, handleResubmitClick, handleClearImg, handleResetPostFields, handleTwLogoClick }) => {
  const actions = [
      <FlatButton
        label="close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleModalToggle}
      />,
    ];
  return(
    <div>
      <FlatButton label="Create new Post" onTouchTap={handleModalToggle} primary={true}/>
      <Tabs>
        <Tab label='Scheduled Posts'>
        <FuturePostList scheduledPosts={scheduledPosts} deletePost={deletePost} editPost={editPost}/>

        </Tab>
        
        <Tab label='History'>
        <PastPostList pastPosts={pastPosts} handleResubmitClick={handleResubmitClick}/>
        </Tab>
      </Tabs>
      <Dialog
          title="New Post"
          actions={actions}
          modal={false}
          open={newPostModal}
          onRequestClose={handleModalToggle}
        >

      <CreatePost
        uploadImg={uploadImg}
        imgUrl={imgUrl}
        text={text}
        scheduleNewpost={scheduleNewpost}
        handleNowSubmit={handleNowSubmit}
        handlePostSubmit={handlePostSubmit}
        handleTextChange={handleTextChange}
        handleFbLogoClick={handleFbLogoClick}
        handleScheduleChange={handleScheduleChange}
        postToTwitter={postToTwitter}
        postToFacebook={postToFacebook}
        scheduledDateTime={scheduledDateTime}
        handleResubmitClick={handleResubmitClick}
        handleClearImg={handleClearImg}
        handleResetPostFields={handleResetPostFields}
        handleTwLogoClick={handleTwLogoClick}
      />
      </Dialog>
    </div>
  )
}

export default Main;
