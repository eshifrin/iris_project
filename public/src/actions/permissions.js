import * as util from '../lib/util';

export const getCurrentUserInfo = () => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch({
    //             type: "SET_NAME",
    //             payload: name
    //         });
    //     }, 2000);
    // }
  return dispatch => {
    return util.getCurrentUserInfo()
      .then((res) => {
        console.log('res: ', res);
        dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: res});
          // this.getScheduledPosts();
          // this.getPastPosts();

      })
      .catch((err) => {
        console.log('error in getting user email, err :', err);
        dispatch({ type: 'GET_USER_INFO_FAIL', payload: err});
      });
  }
}
