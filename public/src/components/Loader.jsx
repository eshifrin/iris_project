import React from 'react';
import loader from '../../../public/dist/img/spin.gif';

const Loader = (props) => (
  <div>
    <img src={loader} style={{ width: '7%', display: 'inline-block' }} />
  </div>
  );

export default Loader;
