import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { yellow800 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CreatePost from './CreatePost';

const propTypes = {
  login: PropTypes.bool.isRequired,
  twitter: PropTypes.bool.isRequired,
  facebook: PropTypes.bool.isRequired,
};

const NavBar = ({ login, twitter, facebook, modalToggle, newPostModal }) => {
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
  const Logged = props => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >

      {twitter && <MenuItem rightIcon={<i className='fa fa-twitter fa-2x' style={ButtonStyleLive}/>} primaryText={<FlatButton href="/twitter" hoverColor={'#e6e6e6'}> authorize</FlatButton>} /> }
      {!twitter && <MenuItem rightIcon={<i className='fa fa-twitter fa-2x' style={ButtonStyleDead}/>} primaryText={<FlatButton href="/deauthorize/twitter" hoverColor={'#e6e6e6'}> unlink</FlatButton>} /> }
      {facebook && <MenuItem rightIcon={<i className='fa fa-facebook fa-2x'style={ButtonStyleLive}/>} primaryText={<FlatButton href="/facebook" hoverColor={'#e6e6e6'}> authorize</FlatButton> } /> }
      {!facebook && <MenuItem rightIcon={<i className='fa fa-facebook fa-2x'style={ButtonStyleDead}/>} primaryText={<FlatButton href="/deauthorize/facebook" hoverColor={'#e6e6e6'}> unlink</FlatButton> } /> }
      <MenuItem primaryText={<FlatButton href='/logout' hoverColor={'#e6e6e6'}>logout</FlatButton>} />
    </IconMenu>
  );

  return (
    <div>

      <AppBar title={<div><img src="./img/logo3.png" width={60}/><div style={{display: 'inline-block', position: 'absolute', left: '10%'}}>your social media manager</div></div>}
        style={{position: 'fixed'}}
        showMenuIconButton={false}
        zDepth={1}
        iconElementRight={login ? <FlatButton href={loginLogoutHref} style={ButtonStyleLive} label={loginOrLogout} /> : 
        <div style={{fontSize: '125%'}}>
          <FlatButton
            onTouchTap={modalToggle}
            primary={true}
            style={{ color: yellow800 }}
          >
          >
            new post
          </FlatButton>
          <Logged />
        </div>}
      />
      <Dialog

        modal={false}
        open={newPostModal}
        onRequestClose={modalToggle}
        style={{height: '100vh', maxHeight: '100%'}}
        bodyStyle={{
          overflow: 'scroll',
          display: 'inline-block',
          margin: '0 auto',
          width: '100%',
          maxHeight: '100% ! important'
        }}

        contentStyle={{
          margin: '-10vh auto',
          minHeight: '80%',
          maxWidth: '50%',
          padding: '2%',
          display: 'block'
        }}

      >
        <CreatePost />
      </Dialog>
    </div>
  );
};

export default NavBar;
