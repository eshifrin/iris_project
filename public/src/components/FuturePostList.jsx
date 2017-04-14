import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx'

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};


const FuturePostList = ({scheduledPosts, deletePost, editPost}) => {

  const posts = scheduledPosts.map(post => 
     <li key={post._id}>
        <FuturePostListItem post={post} />
        <a href="#" onClick={e => deletePost(e, post)}>delete </a>
        <a href="#" onClick={e => editPost(e, post)}>edit</a>
    </li>)

  return (
  <div>
    {(scheduledPosts.length !== 0) && <h4>To be posted:</h4>}
      {(scheduledPosts.length === 0) && <h5>You have not scheduled any messages yet!</h5>}
      <ul>
        {posts}
      </ul>
  </div>)
}
  


export default FuturePostList;
