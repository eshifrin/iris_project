import React from 'react';
import Register from './Register.jsx';
import Connect from './Connect.jsx';
import FuturePost from './FuturePost.jsx';
import PastPost from './PastPost.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {

};

const Main = props => (
  <div>
    <Register />
    <Connect />
    <FuturePost />
    <PastPost />
    <CreatePost />
  </div>
);

export default Main;
