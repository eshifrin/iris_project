import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import PastPostListItem from './PastPostListItem.jsx';
import Paper from 'material-ui/Paper';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const PastPostList = ({ pastPosts, handleResubmitClick }) => {
  const posts = pastPosts.length ? pastPosts.map(post =>
    <ListItem key={post._id}>
      <PastPostListItem post={post} handleResubmitClick={e => handleResubmitClick(e, post)} />
    </ListItem>) : null;

  return (
    <div>
      {(pastPosts.length !== 0) && <h2 style={styles.headline}>History</h2>}
      {(pastPosts.length === 0) && <h5>You have not posted any messages yet!</h5>}
      <List>
        <Paper zDepth={2}>
          {posts}
        </Paper>
      </List>
    </div>);
};


export default PastPostList;
