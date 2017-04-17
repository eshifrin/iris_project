import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  handleClearImg: PropTypes.func.isRequired,
};

const PhotoUpload = ({ uploadImg, handleClearImg }) => (
  <div>
    <input type="file" id="userfile" name="userfile" onChange={uploadImg} />
    <FlatButton primary={true} onClick={handleClearImg}>Clear Image</FlatButton>
  </div>
);

PhotoUpload.propTypes = propTypes;
export default PhotoUpload;
