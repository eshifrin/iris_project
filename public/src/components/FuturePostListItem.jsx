import React from 'react';
import moment from 'moment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const FuturePostListItem = ({ post, deletePost, editPost }) => {
  const dateObj = moment(post.scheduledDateTime);
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  return (
    <Card style={{ width: '70%' }}>
      <CardHeader
        subtitle={`${monthDay} ${time}`}
      />

      <CardText> {post.text} </CardText>
      { (post.imgUrl.length !== 0) && <CardMedia >
        <img src={post.imgUrl} />
      </CardMedia>}
      <FlatButton disabled={!post.postToTwitter}> Twitter <i className="fa fa-twitter" /></FlatButton>
      <FlatButton disabled={!post.postToFacebook}> Facebook</FlatButton>
      <FlatButton href="#" onClick={e => deletePost(e, post)} primary>delete </FlatButton>
      <FlatButton href="#" onClick={e => editPost(e, post)} primary>edit</FlatButton>
    </Card>

  );
};

export default FuturePostListItem;
