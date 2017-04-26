import * as util from '../lib/util';
import axios from 'axios';
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
export const uploadImg = (e) => {
  // console.log('e in uploadImg change action: ', e.target.files[0]);
  const reader = new FileReader(e.target.files[0]);
  reader.readAsDataURL(e.target.files[0]);
  return dispatch => {
    return reader.onloadend = () => {
    
       axios.post('/api/image/imgLink', { image: reader.result })
      .then(res => {
        console.log('res in upload img after axios: ', res);
        dispatch ({
          type: 'UPLOAD_IMG',
          payload: {
            img: reader.result,
            imgUrl: res.data,
          },
        });
      })
      .catch((err) => {
        console.log('errored out in axios of upload img action: ', err);
      });
    };
  }
}

export const handleNowSubmit = () => {
  // console.log(' in handleNowSubmit action, args: ', when);
  return (dispatch, getState) => {
  const st = getState().main;
  const passSt = {
    email: st.email,
    text: st.text,
    img: st.img,
    imgUrl: st.imgUrl,
    postToFacebook: st.postToFacebook,
    postToTwitter: st.postToTwitter,
    updatingPostId: st.updatingPostId
  }
  // console.log('trying getstate in handlenow submit action: ', passSt);
   return util.submitNewPost('now', passSt)
    .then((results) => {
      // console.log('Submit new post in actions - status code:', results.status);
        // console.log('after posting, getting posted posts')
        return util.retrievePosts('posted', st.email)
    })
    .then((results) => {
      // console.log('results after retreive post in submit new post actions: ', results);
        dispatch({type: 'POST_NOW', payload: results.data});
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
    });
  }
}

export const handlePostSubmit = () => {
  // console.log(' in handleNowSubmit action, args: ', when);
  return (dispatch, getState) => {
  const st = getState().main;
  const passSt = {
    email: st.email,
    text: st.text,
    img: st.img,
    imgUrl: st.imgUrl,
    postToFacebook: st.postToFacebook,
    postToTwitter: st.postToTwitter,
    updatingPostId: st.updatingPostId
  }
  // console.log('trying getstate in handlenow submit action: ', passSt);
   return util.submitNewPost('scheduled', passSt)
    .then((results) => {
      // console.log('Submit new post in actions - status code:', results.status);
        // console.log('after posting, getting posted posts')
        return util.retrievePosts('scheduled', st.email)
    })
    .then((results) => {
      // console.log('results after retreive post in submit new post actions: ', results);
        dispatch({type: 'POST_LATER', payload: results.data});
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
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

