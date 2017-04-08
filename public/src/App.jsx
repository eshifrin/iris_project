import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import FuturePostList from './components/FuturePostList.jsx';
import DateTimePicker from './components/DateTimePicker.jsx';
import axios from 'axios';
import * as util from './lib/util.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'gary@b.com',
      postToTwitter: false,
      postToFacebook: false,
      text: '',
      bgColor: 'grey',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: []
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  componentWillMount(){
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
      console.log(reader, '---------------');
      this.setState({
        imgUrl: [reader.result]
      })
      axios.post('/api/image/imgLink', {image: reader.result})
      .then(res => console.log(res));
    }
  }

  handleTextChange(e) {
    let text = e.target.value;
    this.setState({ text: text })
  }

  handleLogoClick() {
    this.setState({ bgColor: 'green' })
  }

  scheduleNewPost(e) {
    const { email, text, imgUrl, postToFacebook, postToTwitter } = this.state;

    e.preventDefault();
    util.submitNewPost('scheduled', { email, text, imgUrl, postToFacebook, postToTwitter })
    .then(results => {
      console.log('Submit new post - status code:', results.status);
    })
    .catch({
      //error handling needs to go here
    })
  }

  handlePostSubmit(e) {
    this.scheduleNewPost(e);
  }

  render() {
    const { imgUrl, text, bgColor, scheduledPosts} = this.state;
    const { uploadImg, scheduleNewPost, handlePostSubmit, handleTextChange, handleLogoClick } = this;
    return (
      <div>
        <DateTimePicker />
        <NavBar />
          <Main
          scheduledPosts={scheduledPosts}
          uploadImg={uploadImg}
          imgUrl={imgUrl}
          bgColor={bgColor}
          scheduleNewPost={scheduleNewPost}
          handlePostSubmit={handlePostSubmit}
          text={text}
          handleTextChange={handleTextChange}
          handleLogoClick={handleLogoClick}
          />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));