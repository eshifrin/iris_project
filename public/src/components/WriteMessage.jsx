import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
};

const WriteMessage = ({ text, handleTextChange, bgColor, handleLogoClick }) => (
  <div>
    <button
      type="button"
      style={{backgroundColor: bgColor}}
      onClick={handleLogoClick}
    >Facebook</button>
    <button
      type="button"
      style={{backgroundColor: bgColor}}
      onClick={handleLogoClick}
    >Twitter</button>
    <h3>Message:</h3>
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
