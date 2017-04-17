import React from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const propTypes = {

};


const FuturePostListItem = ({post, deletePost, editPost}) => {
  const dateObj = moment(post.scheduledDateTime)
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  // console.log('post : ', post);
  // console.log('post.imageurl - ', post.imgUrl);
  return (
  <Card style={{width: 500}}>
  <CardHeader
      subtitle={monthDay + ' ' + time}
    />
  { (post.imgUrl.length !== 0) && <CardMedia>
    <img src={post.imgUrl} style={{width: 100}}/>
  </CardMedia>}
  
  <CardText> {post.text} </CardText>
  <FlatButton disabled={!post.postToTwitter}> Twitter <i className="fa fa-spinner fa-spin"></i></FlatButton>
  <FlatButton disabled={!post.postToFacebook}> Facebook</FlatButton>
  <FlatButton href="#" onClick={e => deletePost(e, post)} primary={true}>delete </FlatButton>
        <FlatButton href="#" onClick={e => editPost(e, post)} primary={true}>edit</FlatButton>
  </Card>
  
)
};


export default FuturePostListItem;
