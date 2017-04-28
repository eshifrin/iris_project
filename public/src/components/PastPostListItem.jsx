import React, { PropTypes } from 'react';
import moment from 'moment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { yellow800 } from 'material-ui/styles/colors';

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

const PastPostListItem = ({ post, handleResubmitClick }) => {
  const dateObj = moment(post.date);
  const monthDay = dateObj.format('M/D');
  const time = dateObj.format('hh:mma');
  // console.log('post id in item: ', post._id);

  return (

    <Card style={{width: '70%', display: 'inline', textAlign: 'center'}}>

      <CardText>
        <span style={{color: 'grey', fontFamily: 'Times New Roman'}}>{monthDay + ' ' + time}</span>
        <br/>
          {(post.imgUrl.length !== 0) && <img src={post.imgUrl} style={{height: 70}}/>}
          {(post.imgUrl.length === 0) && <div style={{height: 70}}/>}
        <br/>
        {post.text}
      </CardText>


      {post.postToTwitter &&
      <span>
      <FlatButton disabled={!post.postToTwitter}
        disableTouchRipple = {true}
        hoverColor ='white'> Twitter <i className="fa fa-twitter"></i>
      </FlatButton>
      <FlatButton> <i className="fa fa-heart" /> : {post.twFavCount}</FlatButton>
      <FlatButton> <i className="fa fa-retweet" /> : {post.twRetweetCount}</FlatButton>
      </span>
      }
      {post.postToFacebook &&
      <span>
      <FlatButton disabled={!post.postToTwitter}
        disableTouchRipple = {true}
        hoverColor ='white'> Facebook <i style={{color: 'grey'}} className="fa fa-facebook"></i>
      </FlatButton>
      <FlatButton> <i className="fa fa-thumbs-up" /> : {post.fbLikeCount}</FlatButton>
      <FlatButton> <i className="fa fa-comments" /> : {post.fbCommentCount}</FlatButton>
      </span>}
      <FlatButton style={{color: yellow800}} onClick={e => handleResubmitClick(e, post)} >Repost</FlatButton>

    </Card>
  );
};


export default PastPostListItem;
