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
      const reader = new FileReader(action.payload);
      reader.readAsDataURL(action.payload);
      reader.onloadend = () => {
        axios.post('/api/image/imgLink', { image: reader.result })
      .then(res =>
         ({
          ...state,
          imgURL: res.data,
          img: reader.result,
        })
      )};

    case 'CLEAR_IMG':
      return {
        ...state,
        img: '',
        imgURL: '',
      };
    
  case 'RESET_POST_FIELDS':
    return {
      ...state,
      text: '',
      img: '',
      imgURL: '',
      scheduledDateTime: '',
    };

  case 'POST':
  return {
    ...state,
    text: '',
    scheduledDateTime: '',
    updatingPostId: undefined,
    newPostModal: false,
    postToTwitter: false,
    postToFacebook: false,
    imgUrl: '',
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
