import moment from 'moment';


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
    case 'SCHEDULE_CHANGE':
      return {
        ...state,
        scheduledDateTime: moment(action.payload).utc().toISOString(),
      };

    case 'UPLOAD_IMG':
    console.log('actionpayload in UPLOAD_IMG reducer: ', action.payload);
        // console.log('in UPLOAD_IMG res: ', res.data);
        // console.log('in UPLOAD_IMG reader.result: ', reader.result);
         return {
          ...state,
          imgUrl: action.payload.imgUrl,
          img: action.payload.img,
        }
      
      // )};

  case 'CLEAR_IMG':
    return {
      ...state,
      img: '',
      imgUrl: '',
    };
    
  case 'RESET_POST_FIELDS':
    return {
      ...state,
      text: '',
      img: '',
      imgUrl: '',
      scheduledDateTime: '',
    };

  case 'POST_NOW':
  console.log('postnow reducer payload: ', action.payload);
  return {
    ...state,
    text: '',
    scheduledDateTime: '',
    updatingPostId: undefined,
    newPostModal: false,
    postToTwitter: false,
    postToFacebook: false,
    imgUrl: '',
    pastPosts: action.payload,
  }

  case 'POST_LATER':
  console.log('postlater reducer payload: ', action.payload);
  return {
    ...state,
    text: '',
    scheduledDateTime: '',
    updatingPostId: undefined,
    newPostModal: false,
    postToTwitter: false,
    postToFacebook: false,
    imgUrl: '',
    scheduledPosts: action.payload,
  }

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
