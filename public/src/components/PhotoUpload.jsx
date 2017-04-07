import React, { PropTypes } from 'react';

const propTypes = {
  uploadImg: PropTypes.func.isRequired
}

const PhotoUpload = ({ uploadImg }) => (
  <div>
    <h2>Upload file:</h2>
    <input type="file" id="userfile" name="userfile" onChange={uploadImg} />
  </div>
);

PhotoUpload.propTypes = propTypes;
export default PhotoUpload;
