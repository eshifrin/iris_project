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
      email: 'gary@b.com',
      postToTwitter: false,
      postToFacebook: false,
      text: '',
      imgUrl: '',
      scheduledPosts: [],
      pastPosts: []
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
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

  scheduleNewPost(e) {
    e.preventDefault();
    let text = this.state.text;
  }

  handlePostSubmit(e) {
    this.scheduleNewPost(e);
  }

        //   <Main
        //   uploadImg={uploadImg}
        //   imgUrl={imgUrl}
        //   scheduleNewPost={scheduleNewPost}
        //   handlePostSubmit={handlePostSubmit}
        //   text={text}
        //   handleTextChange={handleTextChange}
        // />

  render() {
    const { imgUrl, text, scheduledPosts} = this.state;
    const { uploadImg, scheduleNewPost, handlePostSubmit, handleTextChange } = this;
    return (
      <div>
        <NavBar />
        <FuturePostList scheduledPosts={scheduledPosts} />

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));