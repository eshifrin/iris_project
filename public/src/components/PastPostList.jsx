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

  const posts = pastPosts.map(post =>
  <Paper zDepth={1} style={{margin: 20, padding: 5}}>

    <li key={post._id} style={{ 'listStyleType': 'none', width: '100%', textAlign: 'center' }}>
      <PastPostListItem post={post} handleResubmitClick={(e) => handleResubmitClick(e, post)} />
    </li></Paper>)

  return (
    <div>
        {(pastPosts.length === 0) && <h5>You have not posted any messages yet!</h5>}
        <ul style={{ padding: '20px 0'}}>

          {posts}

        </ul>
    </div>)
}


export default PastPostList;
