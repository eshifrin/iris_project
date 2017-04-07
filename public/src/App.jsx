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
      imgPreviewUrl: '',
      schedulePosts: [],
      pastPosts: []
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
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

  scheduleNewPost(e) {
    e.preventDefault();

  }

  onPostSubmit(e) {
    this.scheduleNewPost(e);
    console.log('---onPostSubmit is heard!!!');
  }

  render() {
    const { imgPreviewUrl } = this.state;
    const { uploadImg, scheduleNewPost, onPostSubmit } = this;
    return (
      <div>
        <NavBar />
        <Main
          uploadImg={uploadImg}
          imgUrl={imgPreviewUrl}
          scheduleNewPost={scheduleNewPost}
          onPostSubmit={onPostSubmit}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));