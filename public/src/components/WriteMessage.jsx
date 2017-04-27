import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { textChange, fbClick, twClick } from '../actions/permissions';

class WriteMessage extends React.Component {
  render() {
    let fbLogoStyle = {};
    let twLogoStyle = {};

    if (!this.props.postToFacebook) fbLogoStyle = { opacity: 0.2, padding: 15 };
    else fbLogoStyle = { padding: 20 };
    if (!this.props.postToTwitter) twLogoStyle = { opacity: 0.2, padding: 15 };
    else twLogoStyle = { padding: 20 };

    return (
      <div id="message">
        { this.props.facebookAuthenticated && <img className="sendToFB" style={fbLogoStyle} width="50px" height="auto" src="./img/facebook-logo.png" value="Facebook" onClick={this.props.handleFbLogoClick} checked={this.props.postToFacebook} />}
        { this.props.twitterAuthenticated && <img className="sendToTW" style={twLogoStyle} width="50px" height="auto" src="./img/twitter-logo-final.png" value="Twitter" onClick={this.props.handleTwLogoClick} checked={this.props.postToTwitter} />}
        <br />

        <TextField
          type="text"
          name="text"
          hintText="what would you like to say?"
          value={this.props.text}
          onChange={this.props.handleTextChange}
          multiLine
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.main.text,
  postToFacebook: state.main.postToFacebook,
  postToTwitter: state.main.postToTwitter,
  twitterAuthenticated: state.main.twitterAuthenticated,
  facebookAuthenticated: state.main.facebookAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  handleTextChange: (e) => {
    dispatch(textChange(e));
  },
  handleFbLogoClick: () => {
    dispatch(fbClick());
  },
  handleTwLogoClick: () => {
    dispatch(twClick());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteMessage);
