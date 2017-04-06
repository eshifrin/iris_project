import React from 'react';
import FuturePost from './FuturePost.jsx';
import PastPost from './PastPost.jsx';

const propTypes = {

};


const NavBar = props => (
  <div>
    <FuturePost />
    <PastPost />
  </div>
);


export default NavBar;
