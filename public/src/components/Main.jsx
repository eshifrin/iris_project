import React, { PropTypes } from 'react';
import Register from './Register.jsx';
import Connect from './Connect.jsx';
import FuturePostList from './FuturePostList.jsx';
import PastPostList from './PastPostList.jsx';
import CreatePost from './CreatePost.jsx';

const propTypes = {
  uploadImg: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired
};

const Main = props => (
  <div>
    <Register />
    <Connect />
    <FuturePostList />
    <PastPostList />
    <CreatePost
      uploadImg={props.uploadImg}
      imgUrl={props.imgUrl}
    />
  </div>
);

export default Main;
