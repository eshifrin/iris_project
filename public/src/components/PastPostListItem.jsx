import React, { PropTypes } from 'react';
import moment from 'moment'

const propTypes = {
  handleResubmitClick: PropTypes.func.isRequired,
};

const PastPostListItem = ({post, handleResubmitClick}) => {
  const dateObj = moment(post.date);
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
      <span onClick={handleResubmitClick} value={post._id}> Resend: {post._id}</span>
    </div>
  )
};


export default PastPostListItem;
