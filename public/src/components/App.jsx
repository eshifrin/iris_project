import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NavBar from './NavBar';
import FuturePostList from './FuturePostList';
import * as util from '../lib/util';
import PastPostList from './PastPostList';
import CreatePost from './CreatePost';
import { getCurrentUserInfo, 
          modalToggle, 
          deletePost, 
          populateCreatePost } from '../actions/permissions';

injectTapEventPlugin();


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCurrentUserInfo();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar
            login={!this.props.isLoggedIn}
            twitter={!this.props.twitterAuthenticated}
            facebook={!this.props.facebookAuthenticated}
          />

          {this.props.isLoggedIn &&

          <div>

          <FlatButton 
            label="Create new Post" 
            onTouchTap={this.props.modalToggle} 
            primary={true} 
          />
            
          <Tabs>

            <Tab label='Scheduled Posts'>
              <FuturePostList 
                scheduledPosts={this.props.scheduledPosts} 
                deletePost={this.props.deletePostClick} 
                editPost={this.props.editPostClick} />
            </Tab>

            <Tab label='History'>
              <PastPostList 
                pastPosts={this.props.pastPosts} 
                handleResubmitClick={this.props.editPostClick}/>
            </Tab>

          </Tabs>

          <Dialog
            title="New Post"
            modal={false}
            open={this.props.newPostModal}
            onRequestClose={this.props.modalToggle} 
          >
            <CreatePost/>
          </Dialog>

          </div>
        }

        <footer>
          <a href="https://www.iubenda.com/privacy-policy/8099712">Our Privacy Policy</a>
        </footer>
      </div>


      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.main.isLoggedIn,
    twitterAuthenticated: state.main.twitterAuthenticated,
    facebookAuthenticated: state.main.facebookAuthenticated,
    postToTwitter: state.main.postToTwitter,
    postToFacebook: state.main.postToFacebook,
    email: state.main.email,
    text: state.main.text,
    img: state.main.img,
    imgUrl: state.main.imgUrl,
    scheduledPosts: state.main.scheduledPosts,
    pastPosts: state.main.pastPosts,
    scheduledDateTime: state.main.scheduledDateTime,
    updatingPostId: state.main.updatingPostId,
    newPostModal: state.main.newPostModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserInfo: () => {
      dispatch(getCurrentUserInfo());
    },
    modalToggle: () => {
      dispatch(modalToggle());
    },
    deletePostClick: (e, post) => {
      dispatch(deletePost(e, post));
    },
    editPostClick: (e, post) => {
      dispatch(populateCreatePost(e, post))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
