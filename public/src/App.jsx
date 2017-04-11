import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import FuturePostList from './components/FuturePostList.jsx';
import axios from 'axios';
import * as util from './lib/util.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      twitterAuthenticated: false,
      email: 'test@test.com',
      postToTwitter: true,
      postToFacebook: true,
      text: '',
      bgColor: 'grey',
      img: '',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: [],
      dateTime: ''
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleNowSubmit = this.handleNowSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.scheduleNewPost = this.scheduleNewPost.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
  }

  componentWillMount(){
    //need to start with retrieving user info, if none
      //route to login...
    // util.checkLoggedIn()
    // .then()

    util.retrievePosts('scheduled', this.state.email)
    .then(results => {
      this.setState({
        scheduledPosts: results.data
      })
    })
    .catch({
      //error handling needs to go here
    })
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

  deletePost(e, post) {
    e.preventDefault();
    util.deletePost(post._id)
    .then(() => {
      return util.retrievePosts('scheduled', this.state.email)
    })
    .then(results => {
      this.setState({
        scheduledPosts: results.data
      })
    })
    .catch(err => {
      //error handling
    });
  }

  handleTextChange(e) {
    let text = e.target.value;
    this.setState({ text: text })
  }

  handleLogoClick() {
    if (this.state.bgColor === 'grey') {
      this.setState({ bgColor: 'green' });
    } else {
      this.setState({ bgColor: 'grey' });
    }
  }

  scheduleNewPost(e, when) {
    const { email, text, img, imgUrl, postToFacebook, postToTwitter } = this.state;

    e.preventDefault();
    util.submitNewPost(when, { email, text, img, imgUrl, postToFacebook, postToTwitter })
    .then(results => {
      console.log('Submit new post - status code:', results.status);
    })
    .catch({
      //error handling needs to go here
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

  handleScheduleChange(e) {
    console.log('!!!!!-------')
    e.preventDefault();
    let dateTime = e.target.value;
    console.log('---- what is the datetime??', dateTime.toString());
    this.setState({ dateTime: dateTime });
  }

  render() {
    const { imgUrl, text, bgColor, scheduledPosts} = this.state;
    const { deletePost, uploadImg, scheduleNewPost, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange } = this;
    return (
      <div>
        <a href="/twitter">verify twitter</a>
        <a href="/facebook">verify facebook</a>
        <NavBar />
          <Main
          deletePost={deletePost}
          scheduledPosts={scheduledPosts}
          uploadImg={uploadImg}
          imgUrl={imgUrl}
          bgColor={bgColor}
          scheduleNewPost={scheduleNewPost}
          handlePostSubmit={handlePostSubmit}
          handleNowSubmit={handleNowSubmit}
          text={text}
          handleTextChange={handleTextChange}
          handleLogoClick={handleLogoClick}
          handleScheduleChange={handleScheduleChange}
          />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));