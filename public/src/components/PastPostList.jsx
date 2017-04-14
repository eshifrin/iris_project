import React, { PropTypes } from 'react';
import PastPostListItem from './PastPostListItem.jsx'

const propTypes = {
  pastPosts: PropTypes.array.isRequired,
  handleResubmitClick: PropTypes.func.isRequired,
};

const PastPostList = ({pastPosts, handleResubmitClick}) => {  
  const posts = pastPosts.map(post => 
    <li key={post._id}>
      <PastPostListItem post={post} handleResubmitClick={handleResubmitClick}/>
    </li>)
  return (
    <div>
        {(pastPosts.length !== 0) && <h4>Posted:</h4>}
        {(pastPosts.length === 0) && <h5>You have not posted any messages yet!</h5>}
        <ul>
          {posts}
        </ul>
    </div>)
}


export default PastPostList;
