import React, { PropTypes } from 'react';

const propTypes = {
  uploadImg: PropTypes.func.isRequired
}

const PhotoUpload = ({ uploadImg }) => (
  <div>
    <form id="myForm" name="myForm">
      <div>
        <label>Upload file:</label>
        <input type="file" id="userfile" name="userfile" onChange={uploadImg}/>
      </div>
    </form>
  </div>
);

export default PhotoUpload;
