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
// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import FontAwesome from 'react-fontawesome';
import NavBar from './NavBar';
// import Main from './Main';
import FuturePostList from './FuturePostList';
import * as util from '../lib/util';
import PastPostList from './PastPostList';
import CreatePost from './CreatePost';
import { getCurrentUserInfo, modalToggle } from '../actions/permissions';

injectTapEventPlugin();

// const propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   twitterAuthenticated: PropTypes.bool.isRequired,
//   facebookAuthenticated: PropTypes.bool.isRequired,
//   postToTwitter: PropTypes.bool.isRequired,
//   postToFacebook: PropTypes.bool.isRequired,
//   email: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
//   img: state.img,
//   imgUrl: PropTypes.string.isRequired,
//   scheduledPosts: state.scheduledPosts,
//   pastPosts: state.pastPosts,
//   scheduledDateTime: state.scheduledDateTime,
//   updatingPostId: state.updatingPostId,
//   newPostModal: state.newPostModal,
//   // url: PropTypes.string.isRequired

// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFbLogoClick = this.handleFbLogoClick.bind(this);
    this.handleTwLogoClick = this.handleTwLogoClick.bind(this);
    this.handleNowSubmit = this.handleNowSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.scheduleNewPost = this.scheduleNewPost.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.getPastPosts = this.getPastPosts.bind(this);
    this.getScheduledPosts = this.getScheduledPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.editPost = this.editPost.bind(this);
    this.handleResubmitClick = this.handleResubmitClick.bind(this);
    this.getPostById = this.getPostById.bind(this);
    this.handleClearImg = this.handleClearImg.bind(this);
    this.handleResetPostFields = this.handleResetPostFields.bind(this);
  }

  componentWillMount() {

    this.props.getCurrentUserInfo();
  }


  getScheduledPosts() {
    this.getPosts('scheduled');
  }

  getPastPosts() {
    this.getPosts('posted');
  }

  getPosts(type) {
    // console.log('type in getPosts : ', type);
    util.retrievePosts(type, this.state.email)
    .then((results) => {
      if (type === 'scheduled') {
        this.setState({
          scheduledPosts: results.data,
        })
      } else {
        this.setState({
          pastPosts: results.data,
        })
      }
    })
    .catch((err) => {
      console.log('there was error in retreiving scheduled/past posts of the current user, err : ', err);
    });
  }

  //delete this func

  getPostById(postId) {
    console.log('post id before :', postId);
    util.getPostByPostId(postId)
    .then((post) => {
      const { text, img, imgUrl, postToFacebook, postToTwitter } = post.data[0];
      this.setState({ text, img, imgUrl, postToFacebook, postToTwitter });
    });
  }

  uploadImg(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        img: reader.result,
      });
      axios.post('/api/image/imgLink', { image: reader.result })
      .then(res =>
        this.setState({ imgUrl: res.data }),
      );
    };
  }


  deletePost(e, post) {
    e.preventDefault();
    util.deletePost(post._id)
    .then(() => {
      this.getScheduledPosts();
    })
    .catch((err) => {
      console.log('error while deleting - ', err);
    });
  }

  editPost(e, post) {
    e.preventDefault();
    this.setState({
      text: post.text,
      postToFacebook: post.postToFacebook,
      postToTwitter: post.postToTwitter,
      scheduledDateTime: post.scheduledDateTime,
      imgUrl: post.imgUrl,
      updatingPostId: post._id,
      newPostModal: true,
    });
  }

  handleTextChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  handleScheduleChange(e) {
    e.preventDefault();
    console.log('schedule change args: ', arguments);
    const scheduledDateTime = moment(e.target.value).utc().toISOString();
    this.setState({ scheduledDateTime });
  }

  handleFbLogoClick(e) {
    this.setState({ postToFacebook: !this.state.postToFacebook });
  }

  handleTwLogoClick(e) {
    this.setState({ postToTwitter: !this.state.postToTwitter });
  }

  scheduleNewPost(e, when) {
    const { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter, updatingPostId } = this.state;
    e.preventDefault();
    util.submitNewPost(when, { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter, updatingPostId })
    .then((results) => {
      console.log('Submit new post - status code:', results.status);
      this.setState({
        text: '',
        scheduledDateTime: '',
        updatingPostId: undefined,
        newPostModal: false,
        postToTwitter: false,
        postToFacebook: false,
        imgUrl: '',
      });
      this.getScheduledPosts();
      this.getPastPosts();
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
    });
  }

  handlePostSubmit(e) {
    e.preventDefault();
    this.scheduleNewPost(e, 'scheduled');
  }

  handleNowSubmit(e) {
    e.preventDefault();
    this.scheduleNewPost(e, 'now');
  }

  handleResubmitClick(e, post) {
    e.preventDefault();
    // document.getElementById('message').scrollIntoView();
    const postId = e.target.value;
    console.log('post in  handle resub click: ', post);
    // this.getPostById(post._id);
    this.setState({
      text: post.text,
      postToFacebook: post.postToFacebook,
      postToTwitter: post.postToTwitter,
      scheduledDateTime: post.scheduledDateTime,
      imgUrl: post.imgUrl,
      updatingPostId: post._id,
      newPostModal: !this.state.newPostModal,
    })
  }

  handleClearImg(e) {
    e.preventDefault();
    this.setState({ img: '', imgUrl: '' });
  }


  handleResetPostFields(e) {
    e.preventDefault();
    this.setState({
      postToTwitter: true,
      postToFacebook: true,
      text: '',
      img: '',
      imgUrl: '',
      scheduledDateTime: '',
    });
  }

  render() {
    // const { imgUrl, text, scheduledPosts, postToTwitter, pastPosts, postToFacebook, scheduledDateTime, newPostModal} = this.state;
    const { editPost, deletePost, uploadImg, scheduleNewPost, handleNowSubmit, handlePostSubmit, handleTextChange, handleFbLogoClick, handleScheduleChange, handleResubmitClick, handleClearImg, handleResetPostFields, handleTwLogoClick } = this;
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
              <FlatButton label="Create new Post" onTouchTap={this.props.modalToggle} primary={true}/>
              <Tabs>
                <Tab label='Scheduled Posts'>
                  <FuturePostList scheduledPosts={this.props.scheduledPosts} deletePost={deletePost} editPost={editPost} />
                </Tab>

                <Tab label='History'>
                  <PastPostList pastPosts={this.props.pastPosts} handleResubmitClick={handleResubmitClick}/>
                </Tab>
              </Tabs>
              <Dialog
                title="New Post"
                modal={false}
                open={this.props.newPostModal}
                onRequestClose={this.props.modalToggle}
              >

                <CreatePost
                  uploadImg={uploadImg}
                  imgUrl={this.props.imgUrl}
                  text={this.props.text}
                  scheduleNewPost={scheduleNewPost}
                  handleNowSubmit={handleNowSubmit}
                  handlePostSubmit={handlePostSubmit}
                  handleTextChange={handleTextChange}
                  handleFbLogoClick={handleFbLogoClick}
                  handleScheduleChange={handleScheduleChange}
                  postToTwitter={this.props.postToTwitter}
                  postToFacebook={this.props.postToFacebook}
                  scheduledDateTime={this.props.scheduledDateTime}
                  handleResubmitClick={handleResubmitClick}
                  handleClearImg={handleClearImg}
                  handleResetPostFields={handleResetPostFields}
                  handleTwLogoClick={handleTwLogoClick}
                />
              </Dialog>
            </div>}
          <footer>
            <a href="https://www.iubenda.com/privacy-policy/8099712">Our Privacy Policy</a>
          </footer>
        </div>


      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state in app.jsx : ', state);
  console.log('state is logged in in app.jsx : ', state.main.isLoggedIn);
  // CONST { }
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
