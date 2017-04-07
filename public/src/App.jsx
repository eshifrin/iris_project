import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fbPage: false,
      twPage: false,
      message: '',
      imgPreviewUrl: '',
      schedulePosts: [],
      pastPosts: []
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  uploadImg(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader(file);  
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        imgPreviewUrl: [reader.result]
      })
      axios.post('/api/image/imgLink', {image: reader.result})
      .then(res => console.log(res));
    }
  }

  handleMessageChange(e) {
    let message = e.target.value;
    this.setState({ message: message })
  }

  scheduleNewPost(e) {
    console.log('-----this is the e after clicking submit!!!', this.state.message)

  }

  handlePostSubmit() {
    this.scheduleNewPost();
    console.log('---handlePostSubmit is heard!!!');
  }

  render() {
    const { imgPreviewUrl, message } = this.state;
    const { uploadImg, scheduleNewPost, handlePostSubmit, handleMessageChange } = this;
    return (
      <div>
        <NavBar />
        <Main
          uploadImg={uploadImg}
          imgUrl={imgPreviewUrl}
          scheduleNewPost={scheduleNewPost}
          handlePostSubmit={handlePostSubmit}
          message={message}
          handleMessageChange={handleMessageChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));