import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  postToTwitter: PropTypes.bool.isRequired,
};

const WriteMessage = ({ text, handleTextChange, handleLogoClick, postToFacebook, postToTwitter, handleClearImg, handleResetPostFields }) => {

  let logoStyle = {};
  if (!postToFacebook) logoStyle = { opacity: 0.2 }; 

  return (
  <div id='message'>
    <img id='fbLogo' style={logoStyle} src="https://img.clipartfest.com/5f501c692bb9c6782efc7af0f4bcf349_facebook-icon-circle-vector-facebook-logo_512-512.png" value="Facebook" onClick={handleLogoClick} checked={postToFacebook}/>

    <input
      type="checkbox" name="socialSites" value="Twitter"
      onChange={handleLogoClick} checked={postToTwitter}
    />Twitter
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
//       onChange={handleLogoClick} checked={postToFacebook}
//     />Facebook