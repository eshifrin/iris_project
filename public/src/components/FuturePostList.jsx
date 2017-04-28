import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { yellow800 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


const FuturePostList = ({scheduledPosts, deletePost, editPost}) => {
  const posts = scheduledPosts.map(post =>

     <Paper zDepth={1} style={{margin: 20, padding: 5}}>
       <li key={post._id} style={{ 'listStyleType': 'none', width: '100%', textAlign: 'center' }} >
        <FuturePostListItem post={post} deletePost={(e) => deletePost(e, post)} editPost={(e) => editPost(e, post)}/>
    </li></Paper>)

  return (
    <div>
      {(scheduledPosts.length === 0) && <h5>You have not scheduled any messages yet!</h5>}

      <ul style={{ padding: '20px 0'}}>

        {posts}
      </ul>

  </div>)
}

export default FuturePostList;
