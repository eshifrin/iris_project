import React from 'react';
import FuturePost from './FuturePost.jsx';
import PastPost from './PastPost.jsx';
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const propTypes = {

};


const NavBar = props => (
  <div>
    <FuturePost />
    <PastPost />
  </div>
);


export default NavBar;
