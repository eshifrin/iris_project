import React, { PropTypes } from 'react';
import FuturePostListItem from './FuturePostListItem.jsx'

const propTypes = {
  scheduledPosts: PropTypes.array.isRequired
};


const FuturePostList = ({scheduledPosts}) => {
  console.log('called again')
  console.log(scheduledPosts)
  return (
  <div>

  </div>)
}
  


export default FuturePostList;
    // {scheduledPosts.map(post => {
    //   <FuturePostListItem post={post} />
    // })}