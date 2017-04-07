import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
// import PhotoUpload from './components/PhotoUpload.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPreviewUrl: ''
    };
    this.imageIn = this.imageIn.bind(this);
  }

  imageIn(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader(file);  
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        imgPreviewUrl: [reader.result]
      })
      axios.post('/api/image/imgLink', {image: reader.result})
      // .then((res) => {
      //   console.log(res);
      // })
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Main
          uploadImg={this.imageIn}
          imgUrl={this.state.imgPreviewUrl}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));