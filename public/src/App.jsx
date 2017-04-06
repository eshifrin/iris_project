import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <Main />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));