
import React from 'react';

const PhotoUpload = props => (
  <div>
    <form id="myForm" name="myForm">
      <div>
        <label>Upload file:</label>
        <input type="file" id="userfile" name="userfile" onChange={props.imageIn}/>
      </div>
    <input type="submit" value="Submit!" />
    </form>
  </div>
);

export default PhotoUpload
