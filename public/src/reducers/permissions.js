const permissionsAndPostsReducer = (state = {
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
    // console.log('get user info dispatcher - payload: ', action.payload);
      return {
        ...state,
        email: action.payload.data.email,
        isLoggedIn: !!action.payload.data.email,
        twitterAuthenticated: action.payload.data.twitter,
        facebookAuthenticated: action.payload.data.facebook,
        pastPosts: action.payload.data.pastPosts,
        scheduledPosts: action.payload.data.scheduledPosts,
      };
    case 'GET_USER_INFO_FAIL':
      console.log('get user failed: ', action.payload);
      return state;

    case 'TOGGLE_MODAL':
      return {
        ...state,
        newPostModal: !state.newPostModal,
      };

    case 'TEXT_CHANGE':
      return {
        ...state,
        text: action.payload,
      };
    case 'FB_TOGGLE':
      return {
        ...state,
        postToFacebook: !state.postToFacebook,
      };

    case 'TW_TOGGLE':
      return {
        ...state,
        postToTwitter: !state.postToTwitter,
      };


    default:
      // state = {
      //   ...state,
      // }
      console.log('action type: ', action.type);
      return state;
  }
  // return state;

};

export default permissionsAndPostsReducer;
