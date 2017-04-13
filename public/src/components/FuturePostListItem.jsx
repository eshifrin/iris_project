import React from 'react';
import moment from 'moment'

const propTypes = {

};


const FuturePostListItem = ({post}) => {
  const dateObj = moment(post.scheduledDateTime)
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  // console.log('what ist he post?', post);
  return (
  <div>
  <span> {monthDay} </span>
  <span> {time} </span>
  <span> {post.text} </span>
    <img src={post.imgUrl} />
  <span> Twitter: {post.postToTwitter.toString()} </span>
  <span> Facebook: {post.postToFacebook.toString()} </span>
  </div>
)
};


export default FuturePostListItem;
