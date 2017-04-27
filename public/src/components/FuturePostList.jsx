import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';style={{width: 400}}
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
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
     <ListItem key={post._id}>
        <FuturePostListItem post={post} deletePost={(e) => deletePost(e, post)} editPost={(e) => editPost(e, post)}/>
    </ListItem>)

  return (
  
  <div>
      {(scheduledPosts.length === 0) && <h5>You have not scheduled any messages yet!</h5>}
      <List>
      <Paper zDepth={2}>
        {posts}
        </Paper>
      </List>
  </div>)
}
  


export default FuturePostList;
