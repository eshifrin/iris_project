import React, { PropTypes } from 'react';

const propTypes = {
  message: PropTypes.string.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
};

const WriteMessage = ({ message, handleMessageChange }) => (
  <div>
    <h3>Facebook Status:</h3>
    <h3>Twitter Status:</h3>
    <h3>Message:</h3>
    <input
      type="text"
      name="message"
      placeholder="What do you want to share?"
      value={message}
      onChange={handleMessageChange}
    />
  </div>
);

WriteMessage.propTypes = propTypes;
export default WriteMessage;
