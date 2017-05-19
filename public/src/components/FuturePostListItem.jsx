import React from 'react';
import moment from 'moment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { yellow800 } from 'material-ui/styles/colors';

const FuturePostListItem = ({ post, deletePost, editPost }) => {
  const dateObj = moment(post.scheduledDateTime);
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');

  return (

    <Card style={{width: '70%', display: 'inline', textAlign: 'center' }}>
    <CardText>
      <span style={{color: 'grey', fontFamily: 'Times New Roman'}}>{monthDay + ' ' + time}</span>
      <br/>
      {(post.imgUrl.length !== 0) && <img src={post.imgUrl} style={{height: 150}}/>}
       {(post.imgUrl.length === 0) && <div style={{height: 30}}/>}
      <br/>

       {post.text}
    </CardText>


    <FlatButton
    disabled={!post.postToTwitter}
    disableTouchRipple = {true}
    hoverColor ='white'
    > Twitter <i className="fa fa-twitter"></i>  </FlatButton>
    <FlatButton
    disableTouchRipple = {true}
    hoverColor ='white'
    disabled={!post.postToFacebook}> Facebook <i style={{color: 'grey'}} className="fa fa-facebook"></i> </FlatButton>
    <FlatButton id='deletePost' href="#" onClick={e => deletePost(e, post)}  style={{color: yellow800}}>delete</FlatButton>
    <FlatButton id='editPost' href="#" onClick={e => editPost(e, post)} style={{color: yellow800}}>edit</FlatButton>
    </Card>

  )
};


export default FuturePostListItem;
