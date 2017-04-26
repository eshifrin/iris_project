import * as util from '../lib/util';
import axios from 'axios';
export const getCurrentUserInfo = () => {
  return dispatch => {
    return util.getCurrentUserInfo()
      .then((res) => {
        dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: res});
      })
      .catch((err) => {
        console.log('error in getting user email, err :', err);
        dispatch({ type: 'GET_USER_INFO_FAIL', payload: err});
      });
  }
}
export const uploadImg = (e) => {
  const reader = new FileReader(e.target.files[0]);
  reader.readAsDataURL(e.target.files[0]);
  return dispatch => {
    return reader.onloadend = () => {
    
       axios.post('/api/image/imgLink', { image: reader.result })
      .then(res => {
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
   return util.submitNewPost('now', passSt)
    .then((results) => {
        return util.retrievePosts('posted', st.email)
    })
    .then((results) => {
        dispatch({type: 'POST_NOW', payload: results.data});
    })
    .catch((err) => {
      console.log('issue with posting scheduled posts', err);
    });
  }
}

export const handlePostSubmit = () => {
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
   return util.submitNewPost('scheduled', passSt)
    .then((results) => {
        return util.retrievePosts('scheduled', st.email)
    })
    .then((results) => {
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
  return {
    type: 'SCHEDULE_CHANGE',
    payload: e.target.value,
  }
}


export const handleClearImg = () => {
  return {
    type: 'CLEAR_IMG',
  }
}
export const handleResetPostFields = () => {
  return {
    type: 'RESET_POST_FIELDS'
  }
}

