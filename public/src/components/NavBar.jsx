import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { yellow800 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired
};

const NavBar = ({login, twitter, facebook}) => {
	var ButtonStyle = {
    backgroundColor: 'transparent',
    color: yellow800,
  };
  let loginOrLogout = login ? 'Login | Signup' : 'Log Out';
  let loginLogoutHref = login ? '/login' : '/logout';
  const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Verify Twitter" />
      <MenuItem primaryText="Verify Facebook" />
      <MenuItem primaryText="Logout" />
    </IconMenu>
  );

  const styles = { appBar: { position: "fixed",}, };
	return (
		<div>
		<AppBar title={<img src="./img/logo.png" width={70} />}
    style={styles.appBar}
    showMenuIconButton={false} 
    zDepth={1}
    iconElementRight={<FlatButton href={loginLogoutHref} style={ButtonStyle} label={loginOrLogout}  />}
    />
      { !login &&  <i className='fa fa-twitter fa-2x' style={ButtonStyle}/> }
      { !login && twitter && <FlatButton href="/twitter" style={ButtonStyle} label="verify Twitter"/>}
      { !login && !twitter && <FlatButton href="/deauthorize/twitter" style={ButtonStyle} label="unlink Twitter"/>}
      { !login && <i className='fa fa-facebook fa-2x'style={ButtonStyle}/> }
      { !login && facebook && <FlatButton href="/facebook" style={ButtonStyle} label="verify Facebook"/>}
      { !login && !facebook && <FlatButton href="/deauthorize/facebook" style={ButtonStyle} label="unlink Facebook" />}

	  </div>
  );
};

export default NavBar;
