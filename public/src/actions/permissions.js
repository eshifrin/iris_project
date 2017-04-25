import * as util from '../lib/util';

export const getCurrentUserInfo = () => {
  return dispatch => {
    return util.getCurrentUserInfo()
      .then((res) => {
        console.log('res: ', res);
        dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: res});
      })
      .catch((err) => {
        console.log('error in getting user email, err :', err);
        dispatch({ type: 'GET_USER_INFO_FAIL', payload: err});
      });
  }
}

export const modalToggle = () => {
  return {
    type: 'TOGGLE_MODAL',
  }
}

export const textChange = (event) => {
  console.log('txt in text change : ', event.target.value);
  return {
    type:'TEXT_CHANGE',
    payload: event.target.value,
  }
}

export const fbClick = () => {
  return {
    type: 'FB_TOGGLE',
  }
}
export const twClick = () => {
  return {
    type: 'TW_TOGGLE',
  }
}

export const handleScheduleChange = (e) => {
  console.log('e in handle schedule change action: ', e.target.value);
  return {
    type: 'SCHEDULE_CHANGE',
    payload: e.target.value,
  }
}

export const uploadImg = (e) => {
  console.log('e in uploadImg change action: ', e.target.files[0]);
  return {
    type: 'UPLOAD_IMG',
    payload: e.target.files[0],
  }
}
export const handleClearImg = () => {
  console.log('in handleClearImg');
  return {
    type: 'CLEAR_IMG',
  }
}
export const handleResetPostFields = () => {
  console.log('in handle reset post action');
  return {
    type: 'RESET_POST_FIELDS'
  }
}
export const handleNowSubmit = (e, when, email) => {
  console.log(' in handleNowSubmit action, args: ', e, when);
  // return dispatch => {
    // return util.getCurrentUserInfo()
    //   .then((res) => {
    //     console.log('res: ', res);
    //     dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: res});
    //   })
    //   .catch((err) => {
    //     console.log('error in getting user email, err :', err);
    //     dispatch({ type: 'GET_USER_INFO_FAIL', payload: err});
    //   });
console.log('trying getstate in handlenow submit action: ', getState());
dispatch({type: 'POST'});
// below is good code:
  //     util.submitNewPost(when, { email, text, img, scheduledDateTime, imgUrl, postToFacebook, postToTwitter, updatingPostId })
  //   .then((results) => {
  //     console.log('Submit new post in actions - status code:', results.status);
  //     // dispatch({type: 'POST' })
  //     // this.setState({
  //     //   text: '',
  //     //   scheduledDateTime: '',
  //     //   updatingPostId: undefined,
  //     //   newPostModal: false,
  //     //   postToTwitter: false,
  //     //   postToFacebook: false,
  //     //   imgUrl: '',
  //     // });
  //     if (when === 'now') {
  //       return util.retrievePosts('posted', this.props.email)
  //     }
  //     return util.retrievePosts('scheduled', this.props.email)
  //   })
  //   .then((results) => {
  //     console.log('results after retreive post in submit new post actions: ', resuts);
  //     if (when !== 'now') {
  //       dispatch({type: POST_LATER})
  //       // this.setState({
  //       //   scheduledPosts: results.data,
  //       // })
  //     } else {
  //       dispatch({type: POST_NOW})
  //       // this.setState({
  //       //   pastPosts: results.data,
  //       // })
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('issue with posting scheduled posts', err);
  //   });
  // }
}
export const handlePostSubmit = () => {
  console.log('args in handlepostsub action : ', arguments);
  console.log('trying getstate in handle post submit : ', getState());
  dispatch({type: 'POST'});
}
