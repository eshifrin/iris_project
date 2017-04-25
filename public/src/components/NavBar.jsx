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
  console.log('props in navbar: ', login, twitter, facebook);
	return (
		<div>
		<AppBar title="Iris" >
      { !login && <i className='fa fa-twitter fa-2x' style={ButtonStyle}/> }
      { twitter && <FlatButton href="/twitter" style={ButtonStyle} label="verify Twitter"/>}
      { !login && !twitter && <FlatButton href="/deauthorize/twitter" style={ButtonStyle} label="unlink Twitter"/>}
      { !login && <i className='fa fa-facebook fa-2x'style={ButtonStyle}/> }
      { facebook && <FlatButton href="/facebook" style={ButtonStyle} label="verify Facebook"/>}
      { !login && !facebook && <FlatButton href="/deauthorize/facebook" style={ButtonStyle} label="unlink Facebook" />}
	    { login ? <FlatButton href="/login" style={ButtonStyle} label="Login | Signup"  /> :
                <FlatButton href="/logout" style={ButtonStyle} label="Log Out"  />
      }
	  </AppBar>
	  </div>
  );
};

export default NavBar;
