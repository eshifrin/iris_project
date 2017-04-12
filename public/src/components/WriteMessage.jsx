import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
  postToFacebook: PropTypes.bool.isRequired,
  postToTwitter: PropTypes.bool.isRequired
};

const WriteMessage = ({ text, handleTextChange, handleLogoClick, postToFacebook, postToTwitter }) => (
  <div>
    <input
      type="checkbox" name="socialSites" value="Facebook"
      onChange={handleLogoClick} checked={postToFacebook}
    />Facebook
    <input
      type="checkbox" name="socialSites" value="Twitter"
      onChange={handleLogoClick} checked={postToTwitter}
    />Twitter
    <h4>Message:</h4>
    <input
      type="text"
      name="text"
      placeholder="What do you want to share?"
      value={text}
      onChange={handleTextChange}
    />
  </div>
);

WriteMessage.propTypes = propTypes;
export default WriteMessage;
