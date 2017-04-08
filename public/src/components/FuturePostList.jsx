import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx'

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired
};


const FuturePostList = ({scheduledPosts}) => {
  const posts = scheduledPosts.map(post => 
     <li key={post._id}><FuturePostListItem post={post} /></li>)
  
  return (
  <div>
      <ul>
        {posts}
      </ul>
  </div>)
}
  


export default FuturePostList;
    // {scheduledPosts.map(post => {
    //   <FuturePostListItem post={post} />
    // })}