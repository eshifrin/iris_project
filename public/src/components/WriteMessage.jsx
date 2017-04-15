import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleFbLogoClick: PropTypes.func.isRequired,
  handleTwLogoClick: PropTypes.func.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  postToTwitter: PropTypes.bool.isRequired,
};

const WriteMessage = ({ text, handleTextChange, handleFbLogoClick, postToFacebook, postToTwitter, handleClearImg, handleResetPostFields, handleTwLogoClick }) => {

  let fbLogoStyle = {};
  if (!postToFacebook) fbLogoStyle = { opacity: 0.2 }; 
  let twLogoStyle = {};
  if (!postToTwitter) twLogoStyle = { opacity: 0.2 }; 

  return (
  <div id='message'>
    <img style={fbLogoStyle} width="70px" height="auto" src="https://img.clipartfest.com/5f501c692bb9c6782efc7af0f4bcf349_facebook-icon-circle-vector-facebook-logo_512-512.png" value="Facebook" onClick={handleFbLogoClick} checked={postToFacebook}/>
    <img style={twLogoStyle} width="70px" height="auto" src="http://goinkscape.com/wp-content/uploads/2015/07/twitter-logo-final.png" value="Twitter" onClick={handleTwLogoClick} checked={postToTwitter}/>
    <br/>
    <label>Message:</label>
    <input
      type="text"
      name="text"
      placeholder="What do you want to share?"
      value={text}
      onChange={handleTextChange}
    />

  </div>
)};

WriteMessage.propTypes = propTypes;
export default WriteMessage;



// <input
//       type="checkbox" name="socialSites" value="Facebook"
//       onChange={handleFbLogoClick} checked={postToFacebook}
//     />Facebook

    // <input
    //   type="checkbox" name="socialSites" value="Twitter"
    //   onChange={handleFbLogoClick} checked={postToTwitter}
    // />Twitter