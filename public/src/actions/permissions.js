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
// export const
