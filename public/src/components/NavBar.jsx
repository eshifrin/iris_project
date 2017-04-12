import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired
};

const NavBar = ({login, twitter, facebook}) => {
	return (
	  <div>
	    <h2>Iris </h2>
	    { twitter && <a href="/twitter">verify twitter</a>}  
	    { facebook && <a href="/facebook">verify facebook</a>}
	    { login && (<a href="/login">Login/Signup</a>)}
	    { !facebook && !twitter && !login &&<h5>You have authorized both Facebook and Twitter to post on your behalf</h5>}
	    { !facebook && twitter && <h5>You have authorized Facebook to post on your behalf</h5>}
	    { facebook && !twitter && <h5>You have authorized Twitter to post on your behalf</h5>}
	    { !login && <a href="https://www.iubenda.com/privacy-policy/8093701">Our Privacy Policy</a>}
	  </div>
  );
};

export default NavBar;
