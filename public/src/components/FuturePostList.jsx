import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx'

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired
};


const FuturePostList = ({scheduledPosts, deletePost}) => {
  console.log(deletePost)
  const posts = scheduledPosts.map(post => 
     <li key={post._id}>
        <FuturePostListItem post={post} />
        <a href="#" onClick={e => deletePost(e, post)}>delete this Post</a>
    </li>)

  return (
  <div>
      <ul>
        {posts}
      </ul>
  </div>)
}
  


export default FuturePostList;
