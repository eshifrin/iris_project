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
      text: '',
      img: '',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: [],
      scheduledDateTime: '',
      updatingPostId: undefined

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
    this.editPost = this.editPost.bind(this);

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

  editPost(e, post) {
    console.log('post in edit post ---- : ', post);
    e.preventDefault();
    this.setState({
      text: post.text,
      postToFacebook: post.postToFacebook,
      postToTwitter: post.postToTwitter,
      scheduledDateTime: post.scheduledDateTime,
      imgUrl: post.imgUrl,
      updatingPostId: post._id
    })
  }

  handleTextChange(e) {
    let text = e.target.value;
    this.setState({ text: text })
  }

  handleScheduleChange(e) {
    e.preventDefault();
    // console.log('time sent by datepicker', e.target.value)
    let scheduledDateTime = moment(e.target.value).utc().toISOString();
    // console.log('date created by datepicker using moment - handleschedule change: ', scheduledDateTime)
    this.setState({ scheduledDateTime: scheduledDateTime });
  }

  handleLogoClick(e) {
    if (e.target.value === 'Facebook') {
      this.setState({postToFacebook: e.target.checked});
    } else {
      this.setState({postToTwitter: e.target.checked});
    }
  }

  scheduleNewPost(e, when) {
    
    // when = (this.state.updatingPostNum) ? 'update' : when;
    console.log('when in schedul new post :', when)
    const { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter, updatingPostId } = this.state;
    e.preventDefault();
    util.submitNewPost(when, { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter, updatingPostId })
    .then(results => {
      console.log('Submit new post - status code:', results.status);
      this.setState({
        text: '',
        scheduledDateTime: '',
        updatingPostId: undefined
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
    const { editPost, deletePost, uploadImg, scheduleNewPost, handleNowSubmit, handlePostSubmit, handleTextChange, handleLogoClick, handleScheduleChange } = this;
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
          editPost={editPost}
          />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));