import React, { PropTypes } from 'react';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  handleClearImg: PropTypes.func.isRequired,
};

const PhotoUpload = ({ uploadImg, handleClearImg }) => (
  <div>
    <h4>Upload file:</h4>
    <input type="file" id="userfile" name="userfile" onChange={uploadImg} />
    <button onClick={handleClearImg}>Clear Image</button>
  </div>
);

PhotoUpload.propTypes = propTypes;
export default PhotoUpload;
