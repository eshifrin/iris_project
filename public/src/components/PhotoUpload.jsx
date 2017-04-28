import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactDOM from 'react-dom';

const clear = () => {
 this.photoVal = '';
}

const PhotoUpload = ({ uploadImg, handleClearImg, imgUrl, photoVal = '' }) => (
  <div>
    <img src={imgUrl || "./img/cloud_f.png"} style={{height: '150px'}} />

    <div>
    
    {imgUrl ? 
    <FlatButton 
      primary={true} 
      onClick={() => clear.bind(this) && handleClearImg()}>
    clear image
    </FlatButton>
    :
      
    <FlatButton 
      primary={true}
      containerElement='label' 
      labelStyle={{'text-transform': 'lowercase'}}
      onChange={uploadImg}
    > 
    upload image
      <input type="file" style={{ display: 'none' }} value={photoVal} />
    </FlatButton>
    }

    </div>

  </div>
);

export default PhotoUpload;
