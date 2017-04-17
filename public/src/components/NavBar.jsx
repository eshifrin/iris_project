import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired
};

const NavBar = ({login, twitter, facebook}) => {
	var ButtonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };
	return (
		<div>
		<AppBar title="Iris" >
	    { twitter && <FlatButton href="/twitter" style={ButtonStyle} label="verify Twitter"/>}  
	    { facebook && <FlatButton href="/facebook" style={ButtonStyle} label="verify Facebook"/>}
      { !login && !twitter && <FlatButton href="/deauthorize/twitter" style={ButtonStyle} label="unlink Twitter"/>}
      { !login && !facebook && <FlatButton href="/deauthorize/facebook" style={ButtonStyle} label="unlink Facebook" />}
	    { login ? <FlatButton href="/login" style={ButtonStyle} label="Login | Signup"  /> : 
                <FlatButton href="/logout" style={ButtonStyle} label="Log Out"  /> 
      }
	  </AppBar>

	    { !facebook && !twitter && !login &&<h5>You have authorized both Facebook and Twitter to post on your behalf</h5>}
	    { !facebook && twitter && <h5>You have authorized Facebook to post on your behalf</h5>}
	    { facebook && !twitter && <h5>You have authorized Twitter to post on your behalf</h5>}
	    { !login && <a href="https://www.iubenda.com/privacy-policy/8093701">Our Privacy Policy</a>}
	  </div>
  );
};

export default NavBar;
