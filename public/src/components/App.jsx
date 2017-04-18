import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import FuturePostList from './FuturePostList.jsx';
import axios from 'axios';
import * as util from '../lib/util.js'
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import FontAwesome from 'react-fontawesome';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      twitterAuthenticated: true,
      facebookAuthenticated: true,
      email: '',
      postToTwitter: false,
      postToFacebook: false,
      text: '',
      img: '',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: [],
      scheduledDateTime: '',
      updatingPostId: undefined,
      newPostModal: false,
    };
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
    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  componentWillMount(){
    util.getCurrentUserInfo()
    .then((res) => {
      console.log(res);
      if (res.data.email.length !== 0){
        this.setState({email: res.data.email,
          isLoggedIn: true,
          twitterAuthenticated: res.data.twitter,
          facebookAuthenticated: res.data.facebook
        });
        this.getScheduledPosts();
        this.getPastPosts();
      }
    })
    .catch((err) => {
      console.log('error in getting user email, err :', err);
      console.log('we must remove all console logs : )')
    });
  }

  uploadImg(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        img: reader.result
      })
      axios.post('/api/image/imgLink', {image: reader.result})
      .then(res =>
        this.setState({ imgUrl: res.data })
      );
    }
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
          scheduledPosts: results.data
        })
      } else {
        this.setState({
          pastPosts: results.data
        })
      }
    })
    .catch((err) => {
      console.log('there was error in retreiving scheduled/past posts of the current user, err : ', err);
    })
  }

  //delete this func

  getPostById(postId) {
    console.log('post id before :', postId)
    util.getPostByPostId(postId)
    .then((post) => {
      const { text, img, imgUrl, postToFacebook, postToTwitter } = post.data[0];
      this.setState({ text, img, imgUrl, postToFacebook, postToTwitter });
    });
  }

  deletePost(e, post) {
    e.preventDefault();
    util.deletePost(post._id)
    .then(() => {
      this.getScheduledPosts();
    })
    .catch((err) => {
      console.log('error while deleting');
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
      newPostModal: true
    })
  }

  handleTextChange(e) {
    let text = e.target.value;
    this.setState({ text: text })
  }

  handleScheduleChange(e) {
    e.preventDefault();
    console.log('schedule change args: ', arguments);
    let scheduledDateTime = moment(e.target.value).utc().toISOString();
    this.setState({ scheduledDateTime: scheduledDateTime });
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
        imgUrl: ''
      })
      this.getScheduledPosts();
      this.getPastPosts();
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
    })
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
    console.log('post in  handle resub click: ', post)
    // this.getPostById(post._id);
    this.setState({
      text: post.text,
      postToFacebook: post.postToFacebook,
      postToTwitter: post.postToTwitter,
      scheduledDateTime: post.scheduledDateTime,
      imgUrl: post.imgUrl,
      updatingPostId: post._id,
      newPostModal: !this.state.newPostModal
    })
    // handleModalToggle();
  }

  handleClearImg(e) {
    e.preventDefault();
    this.setState({ img: '', imgUrl: '' });
  }

  handleModalToggle() {
    this.setState({
      newPostModal: !this.state.newPostModal
    });
  }

  handleResetPostFields(e) {
    e.preventDefault();
    this.setState({
      postToTwitter: true,
      postToFacebook: true,
      text: '',
      img: '',
      imgUrl: '',
      scheduledDateTime: ''
    })
  }

  render() {

    const { imgUrl, text, scheduledPosts, postToTwitter, pastPosts, postToFacebook, scheduledDateTime, newPostModal} = this.state;
    const { handleModalToggle, editPost, deletePost, uploadImg, scheduleNewPost, handleNowSubmit, handlePostSubmit, handleTextChange, handleFbLogoClick, handleScheduleChange, handleResubmitClick, handleClearImg, handleResetPostFields, handleTwLogoClick } = this;

    return (
      <MuiThemeProvider>
        <div>
          <NavBar
            login={!this.state.isLoggedIn}
            twitter={!this.state.twitterAuthenticated}
            facebook={!this.state.facebookAuthenticated}
          />
            {this.state.isLoggedIn && <Main
            deletePost={deletePost}
            scheduledPosts={scheduledPosts}
            pastPosts={pastPosts}
            uploadImg={uploadImg}
            imgUrl={imgUrl}
            postToFacebook={postToFacebook}
            postToTwitter={postToTwitter}
            scheduleNewPost={scheduleNewPost}
            handlePostSubmit={handlePostSubmit}
            handleNowSubmit={handleNowSubmit}
            scheduledDateTime={scheduledDateTime}
            text={text}
            handleTextChange={handleTextChange}
            handleFbLogoClick={handleFbLogoClick}
            handleTwLogoClick={handleTwLogoClick}
            handleScheduleChange={handleScheduleChange}
            editPost={editPost}
            handleResubmitClick={handleResubmitClick}
            handleClearImg={handleClearImg}
            handleResetPostFields={handleResetPostFields}
            newPostModal={newPostModal}
            handleModalToggle={handleModalToggle}
            />}
            <footer>
            <a href="https://www.iubenda.com/privacy-policy/8099712">Our Privacy Policy</a>
            </footer>
        </div>


      </MuiThemeProvider>
    );
  }
}

export default App
