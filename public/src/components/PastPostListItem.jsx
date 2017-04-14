import React from 'react';
import moment from 'moment'

const propTypes = {

};


const PastPostListItem = ({post}) => {
  const dateObj = moment(post.date)
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  const status = (sourceBoolean, sourceId) => {
    if (!sourceBoolean) { return 'na'; }
    return !!sourceId ? 'sent' : 'error';
  }

  return (
  <div>
  <span> {monthDay} </span>
  <span> {time} </span>
  <span> {post.text} </span>
    {post.imgUrl && <img src={post.imgUrl} />}
  <span> Twitter: {status(post.postToTwitter, post.postedTwitterId)} </span>
  <span> Facebook: {status(post.postToFacebook, post.postedFacebookId)} </span>
  </div>
)
};


export default PastPostListItem;
