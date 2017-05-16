import moment from 'moment';

const initialState = {
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
  calendarView: false,
  isLoading: false,
};


const permissionsAndPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case
    case 'GET_USER_INFO_SUCCESS':
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
      return {
        ...state,
        imgUrl: action.payload.imgUrl,
        img: action.payload.img,
      };

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
      };

    case 'POST_LATER':
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
      };

    case 'UPDATE_SCHEDULED_POSTS':
      return {
        ...state,
        scheduledPosts: action.payload,
      };

    case 'POPULATE_CREATE_POST':
      return {
        ...state,
        postToTwitter: action.payload.postToTwitter,
        postToFacebook: action.payload.postToFacebook,
        text: action.payload.text,
        img: action.payload.img,
        imgUrl: action.payload.imgUrl,
        scheduledDateTime: action.payload.scheduledDateTime,
        updatingPostId: action.payload._id,
        newPostModal: true,
      };

    case 'SWITCH_SCHEDULED_VIEW':
      return {
        ...state,
        calendarView: !state.calendarView,
      };

    case 'TOGGLE_LOADER':
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    default:
      return state;
  }
};

export default permissionsAndPostsReducer;
