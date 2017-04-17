import React, { PropTypes } from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  handleResubmitClick: PropTypes.func.isRequired,
};

const PastPostListItem = ({post, handleResubmitClick}) => {
  const dateObj = moment(post.date);
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  
  return (
    <Card>
      <CardHeader
      subtitle={monthDay + ' ' + time}
      />

      { (post.imgUrl.length !== 0) && <CardMedia>
        <img src={post.imgUrl} />
      </CardMedia>}
      
      <CardText> {post.text} </CardText>
      {post.postToTwitter && <FlatButton secondary={!post.postedTwitterId}> Twitter</FlatButton>}
      {post.postToFacebook && <FlatButton secondary={!post.postedFacebookId}> Facebook</FlatButton>}
      <FlatButton primary={true} onClick={handleResubmitClick} value={post._id} >Repost</FlatButton>
    </Card>
  )
};


export default PastPostListItem;
