import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { yellow800, blueGrey500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Tabs, Tab } from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NavBar from './NavBar.jsx';
import FuturePostList from './FuturePostList.jsx';
import * as util from '../lib/util';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';
import Loader from './Loader.jsx';
import { getCurrentUserInfo,
          modalToggle,
          deletePost,
          populateCreatePost,
          switchScheduledView
        } from '../actions/permissions';

injectTapEventPlugin();
import Calendar from './Calendar.jsx'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'white',
    accent1Color: yellow800,
  },
  appBar: {
    color: 'white',
    textColor: yellow800,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getCurrentUserInfo();

  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBar
            login={!this.props.isLoggedIn}
            twitter={!this.props.twitterAuthenticated}
            facebook={!this.props.facebookAuthenticated}
            modalToggle={this.props.modalToggle}
            newPostModal={this.props.newPostModal}
          />

          {this.props.isLoggedIn &&
          <div>

          <Tabs style={{marginTop: '20px'}}>

            <Tab
              label="Scheduled Posts"
              style={{ color: yellow800 }}
            >
              <div style={{width: '100%', padding: 20}}>
                {(this.props.calendarView) && <i
                  className={`fa fa-list-ul fa-2x toggle-on`}
                  name="listIcon"
                  style={{ display: 'block', margin: '0 auto', width: 50 }}
                  aria-hidden="true"
                  onClick={this.props.switchScheduledViewClick}
                />}
                {(!this.props.calendarView) && <i
                  className={`fa fa-calendar fa-2x toggle-on`}
                  name="calendarIcon"
                  aria-hidden="true"
                  style={{ display: 'block', margin: '0 auto', width: 50 }}
                  onClick={this.props.switchScheduledViewClick}
                />}
              </div>

              {this.props.calendarView ?
              <div className='calendar' >
                <Calendar scheduledPosts={this.props.scheduledPosts}/>
              </div>
              :
              <FuturePostList
                scheduledPosts={this.props.scheduledPosts}
                deletePost={this.props.deletePostClick}
                editPost={this.props.editPostClick} />
              }

            </Tab>

            <Tab label='History'
            style={{ color: yellow800 }}>
              <PastPostList
                pastPosts={this.props.pastPosts}
                handleResubmitClick={this.props.editPostClick}/>
            </Tab>

          </Tabs>

          </div>
        }

        {!(this.props.isLoggedIn) && <div style={{ textAlign: 'center', backgroundColor: 'white', color: blueGrey500 }}>
          <img src="./img/yellowBanner.png"/>
            <h1>Welcome to Iris</h1>
            <p>We are a one-stop social media manager for posting to Facebook and Twitter.</p>
            <img src="./img/bw.png" />
          </div>}

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
    calendarView: state.main.calendarView,
    isLoading: state.main.isLoading,

  };
};

export const mapDispatchToProps = (dispatch) => {
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
    },
    switchScheduledViewClick: (e) => {
      dispatch(switchScheduledView(e))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
