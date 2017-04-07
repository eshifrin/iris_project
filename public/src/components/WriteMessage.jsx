import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};

const WriteMessage = ({ text, handleTextChange }) => (
  <div>
    <h3>Facebook Status:</h3>
    <h3>Twitter Status:</h3>
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
