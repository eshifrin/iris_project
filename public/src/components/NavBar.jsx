import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired
};

const NavBar = ({login, twitter, facebook}) => {
	console.log('props in nav bar: ', login);
	return (
	  <div>
	    <h2>Iris </h2>
	    { twitter && <a href="/twitter">verify twitter</a>}  
	    { facebook && <a href="/facebook">verify facebook</a>}
	    { login && (<a href="/login">Login/Signup</a>)}
	  </div>
  );
};

export default NavBar;
