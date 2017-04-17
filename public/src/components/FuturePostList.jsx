import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};


const FuturePostList = ({scheduledPosts, deletePost, editPost}) => {

  const posts = scheduledPosts.map(post => 
     <ListItem key={post._id}>
        <FuturePostListItem post={post} deletePost={deletePost} editPost={editPost}/>
        
    </ListItem>)

  return (
  
  <div>
    {(scheduledPosts.length !== 0) && <h4>To be posted:</h4>}
      {(scheduledPosts.length === 0) && <h5>You have not scheduled any messages yet!</h5>}
      <List>
        {posts}
      </List>
  </div>)
}
  


export default FuturePostList;
