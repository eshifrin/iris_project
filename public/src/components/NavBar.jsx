import React from 'react';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const propTypes = {

};

const NavBar = props => (
  <div>
    <FuturePostList />
    <PastPostList />
  </div>
);

export default NavBar;
