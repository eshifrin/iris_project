import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { yellow800 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired,
};

const NavBar = ({ login, twitter, facebook }) => {
  const ButtonStyleLive = {
    backgroundColor: 'transparent',
    color: yellow800,
  };
  const ButtonStyleDead = {
    backgroundColor: 'transparent',
    color: 'grey',
  };
  const loginOrLogout = login ? 'Login | Signup' : 'Log Out';
  const loginLogoutHref = login ? '/login' : '/logout';
  const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      {twitter && <MenuItem rightIcon={<i className='fa fa-twitter fa-2x' style={ButtonStyleLive}/>} primaryText={<FlatButton href="/twitter" hoverColor={'#e6e6e6'}> Verify Twitter </FlatButton>} /> }
      {!twitter && <MenuItem rightIcon={<i className='fa fa-twitter fa-2x' style={ButtonStyleDead}/>} primaryText={<FlatButton href="/deauthorize/twitter" hoverColor={'#e6e6e6'}> Unlink Twitter </FlatButton>} /> }
      {facebook && <MenuItem rightIcon={<i className='fa fa-facebook fa-2x'style={ButtonStyleLive}/>} primaryText={<FlatButton href="/facebook" hoverColor={'#e6e6e6'}> Verify Facebook</FlatButton> } /> }
      {!facebook && <MenuItem rightIcon={<i className='fa fa-facebook fa-2x'style={ButtonStyleDead}/>} primaryText={<FlatButton href="/deauthorize/facebook" hoverColor={'#e6e6e6'}> Unlink Facebook</FlatButton> } /> }
      <MenuItem primaryText={<FlatButton href='/logout' label='Log Out' hoverColor={'#e6e6e6'}/>} />
    </IconMenu>
  );

  return (
    <div>
      <AppBar title={<img src="./img/logo3.png" width={60}/>}
        showMenuIconButton={false}
        zDepth={1}
        iconElementRight={login ? <FlatButton href={loginLogoutHref} style={ButtonStyleLive} label={loginOrLogout} /> : <div>
          <FlatButton href={loginLogoutHref} style={ButtonStyleDead} label={loginOrLogout} />
          <Logged />
          </div>}
      />
	  </div>
  );
};

export default NavBar;
