const permissionsReducer = (state = {
  isLoggedIn: false,
  twitterAuthenticated: false,
  facebookAuthenticated: false,
  postToTwitter: false,
  postToFacebook: false,
  email: '',
  text: '',
  img: '',
  imgUrl: '',
  scheduledPosts: [],
  pastPosts: [],
  scheduledDateTime: '',
  updatingPostId: undefined,
  newPostModal: false,
}, action) => {
  console.log('action type: ', action.type);
  switch (action.type) {
    // case
    case 'GET_USER_INFO_SUCCESS':
    // if (res.data.email.length !== 0) {
    //         this.setState({ email: res.data.email,
    //           isLoggedIn: true,
    //           twitterAuthenticated: res.data.twitter,
    //           facebookAuthenticated: res.data.facebook,
    //         });
    // if (action.payload)
    console.log('get user info dispatcher - payload: ', action.payload);
      state = {
        ...state,
        email: action.payload.data.email,
        isLoggedIn: !!action.payload.data.email,
        twitterAuthenticated: action.payload.data.twitter,
        facebookAuthenticated: action.payload.data.facebook,
        pastPosts: action.payload.data.pastPosts,
        scheduledPosts: action.payload.data.scheduledPosts,
      };
      break;
    case 'GET_USER_INFO_FAIL':
      console.log('get user failed: ', action.payload);
      break;
    default:
      // state = {
      //   ...state,
      // }
      console.log('action type: ', action.type);
      break;
  }
  return state;

};

export default permissionsReducer;
