import React, { PropTypes } from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  handleResubmitClick: PropTypes.func.isRequired,
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const PastPostListItem = ({post, handleResubmitClick}) => {
  const dateObj = moment(post.date);
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  // console.log('post id in item: ', post._id);
  
  return (
    <Card style={{width: '30%'}}>
      <CardHeader
      subtitle={monthDay + ' ' + time}
      />

      <CardText> {post.text} </CardText>
      { (post.imgUrl.length !== 0) && <CardMedia>
        <img src={post.imgUrl} />
      </CardMedia>}

      {post.postToTwitter && <FlatButton secondary={!post.postedTwitterId}> Twitter</FlatButton>}
      {post.postToFacebook && <FlatButton secondary={!post.postedFacebookId}> Facebook</FlatButton>}
      <FlatButton primary={true} onClick={e => handleResubmitClick(e, post)} >Repost</FlatButton>
      <FlatButton> Favorite Count: {post.twFavCount}</FlatButton>
      <FlatButton> Retweet Count: {post.twRetweetCount}</FlatButton>
    </Card>
  )
};


export default PastPostListItem;
