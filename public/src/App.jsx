import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>This is App component.</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
