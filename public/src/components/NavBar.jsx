import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const propTypes = {

};

const NavBar = props => (
  <div>
    <a href="/twitter">verify twitter</a>
    <a href="/facebook">verify facebook</a>
  </div>
);

export default NavBar;
