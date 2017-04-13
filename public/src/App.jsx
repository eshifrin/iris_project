import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import FuturePostList from './components/FuturePostList.jsx';
import axios from 'axios';
import * as util from './lib/util.js'
import moment from 'moment';

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
      postToTwitter: true,
      postToFacebook: true,
      text: '',
      img: '',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: [],
      scheduledDateTime: '',

    };
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleNowSubmit = this.handleNowSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.scheduleNewPost = this.scheduleNewPost.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.getPastPosts = this.getPastPosts.bind(this);
    this.getScheduledPosts = this.getScheduledPosts.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.updatePost = this.updatePost.bind(this);

  }

  componentWillMount(){
    util.getCurrentUserInfo()
    .then((res) => {
      // console.log('result data in then of getCurrentUserCred', JSON.stringify(res.data));
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
    });
  }

  uploadImg(e) {
    e.preventDefault();
    let file = e.target.files[0];
    console.log('e.taget files in upload img : ', e.target.files)
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
    // console.log('in get posts, type : ', type)
    util.retrievePosts(type, this.state.email)
    .then(results => {
      // console.log('in get posts, results: ', results);
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
      console.log('there was error in retreiving scheduledposts of the current user, err : ', err);
    })
  }

  deletePost(e, post) {
    e.preventDefault();
    util.deletePost(post._id)
    .then(() => {
      this.getScheduledPosts();
    })
    .catch(err => {
      console.log('error while deleting');
    });
  }

  updatePost(e, post) {
    e.preventDefault();
    console.log('in update post, post : ', post);

    // let file = post.img;
    console.log('update post img : ', post.img);

    // let reader = new FileReader(file);  
    // reader.readAsArrayBuffer(file);
    // reader.onloadend = () => {
    //   this.setState({
    //     img: reader.result
    //   });
    // }
      // console.log('binary blob in update post', reader.result);
    this.setState({
      text: post.text,
      postToFacebook: post.postToFacebook,
      postToTwitter: post.postToTwitter,
      scheduledDateTime: post.date,
      img: post.img
    })
  }

  handleTextChange(e) {
    let text = e.target.value;
    this.setState({ text: text })
  }

  handleScheduleChange(e) {
    e.preventDefault();
    let scheduledDateTime = moment(e.target.value).utc().toISOString();
    this.setState({ scheduledDateTime: scheduledDateTime });
  }

  handleLogoClick(e) {
    // console.log('print event checked: ', e.target.checked);
    // console.log('print event value: ', e.target.value);
    if (e.target.value === 'Facebook') {
      this.setState({postToFacebook: e.target.checked});
    } else {
      this.setState({postToTwitter: e.target.checked});
    }
  }

  scheduleNewPost(e, when) {
    const { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter } = this.state;
    // console.log('state before schedule post: ', this.state);
    e.preventDefault();
    // console.log('when in schedule post: ', when);
    // console.log('e target in schedule post: ', e.target);
    // console.log('scheduledDateTime in state before scheduled posting: ', scheduledDateTime);
    util.submitNewPost(when, { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter })
    .then(results => {
      console.log('Submit new post - status code:', results.status);
      this.setState({
        text: ''
      })
      this.getScheduledPosts();
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
    })
  }

  handlePostSubmit(e) {
    e.preventDefault();
    console.log('submitting SCHEDULED');
    this.scheduleNewPost(e, 'scheduled');
  }

  handleNowSubmit(e) {
    e.preventDefault();
    console.log('submitting NOW!');
    this.scheduleNewPost(e, 'now');
  }


  render() {
    const { imgUrl, text, scheduledPosts, pastPosts, postToTwitter, postToFacebook, scheduledDateTime} = this.state;
    const { updatePost, deletePost, uploadImg, scheduleNewPost, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange } = this;
    return (
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
          handleLogoClick={handleLogoClick}
          handleScheduleChange={handleScheduleChange}
          updatePost={updatePost}
          />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));