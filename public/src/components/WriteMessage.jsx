import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { textChange, fbClick, twClick } from '../actions/permissions';

// const propTypes = {
//   text: PropTypes.string.isRequired,
//   // handleTextChange: PropTypes.func.isRequired,
//   handleFbLogoClick: PropTypes.func.isRequired,
//   handleTwLogoClick: PropTypes.func.isRequired,
//   postToFacebook: PropTypes.bool.isRequired,
//   postToTwitter: PropTypes.bool.isRequired,
// };

// const WriteMessage = ({ text, handleFbLogoClick, postToFacebook, postToTwitter, handleClearImg, handleResetPostFields, handleTwLogoClick }) => {
class WriteMessage extends React.Component {

  render() {
  // Styling scrips for Facebook and Twitter logos's onClick actions
    let fbLogoStyle = {};
    let twLogoStyle = {};

    if (!this.props.postToFacebook) fbLogoStyle = { opacity: 0.2, padding: 20 }
      else fbLogoStyle = { padding: 20 }
    if (!this.props.postToTwitter) twLogoStyle = { opacity: 0.2, padding: 20 }
      else twLogoStyle = { padding: 20 }

    return (
      <div id='message'>
        { this.props.facebookAuthenticated && <img className="sendToFB" style={fbLogoStyle} width="70px" height="auto" src="./img/facebook-logo.png" value="Facebook" onClick={this.props.handleFbLogoClick} checked={this.props.postToFacebook}/>}
        { this.props.twitterAuthenticated && <img className="sendToTW" style={twLogoStyle} width="70px" height="auto" src="./img/twitter-logo-final.png" value="Twitter" onClick={this.props.handleTwLogoClick} checked={this.props.postToTwitter}/>}
        <br/>
        <TextField
          type="text"
          name="text"
          hintText="What do you want to share?"
          floatingLabelText="Post"
          value={this.props.text}
          onChange={this.props.handleTextChange}
        />

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('state in writemsg.jsx : ', state);
  console.log('state is logged in in writemsg.jsx : ', state.main.text);
  return {
    text: state.main.text,
    postToFacebook: state.main.postToFacebook,
    postToTwitter: state.main.postToTwitter,
    twitterAuthenticated: state.main.twitterAuthenticated,
    facebookAuthenticated: state.main.facebookAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTextChange: (e) => {
      dispatch(textChange(e));
    },
    handleFbLogoClick: () => {
      dispatch(fbClick());
    },
    handleTwLogoClick: () => {
      dispatch(twClick());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteMessage);
