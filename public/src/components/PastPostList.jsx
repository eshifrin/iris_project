import React, { PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import PastPostListItem from './PastPostListItem.jsx';

const propTypes = {
  pastPosts: PropTypes.array.isRequired,
  handleResubmitClick: PropTypes.func.isRequired,
};

const PastPostList = ({ pastPosts, handleResubmitClick }) => {
  const posts = pastPosts.map(post =>
    <ListItem key={post._id}>
      <PastPostListItem post={post} handleResubmitClick={handleResubmitClick} />
    </ListItem>)
  return (
    <div>
        {(pastPosts.length !== 0) && <h4>Posted:</h4>}
        {(pastPosts.length === 0) && <h5>You have not posted any messages yet!</h5>}
        <List>
          {posts}
        </List>
    </div>)
}


export default PastPostList;
