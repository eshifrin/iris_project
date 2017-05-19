import reducer from '../public/src/reducers/permissions.js';
import { expect } from 'chai';

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

const afterUserInfoSuccess = {
  isLoggedIn: true,
  twitterAuthenticated: true,
  facebookAuthenticated: true,
  postToTwitter: false,
  postToFacebook: false,
  email: 'anemail@account.com',
  text: '',
  img: '',
  imgUrl: '',
  scheduledPosts: [1, 2],
  pastPosts: [3, 4],
  scheduledDateTime: '',
  updatingPostId: undefined,
  newPostModal: false,
  calendarView: false,
  isLoading: false,
};

const afterImageUpload = {
  isLoggedIn: true,
  twitterAuthenticated: true,
  facebookAuthenticated: true,
  postToTwitter: false,
  postToFacebook: false,
  email: 'anemail@account.com',
  text: '',
  img: 'img1',
  imgUrl: 'img2',
  scheduledPosts: [1, 2],
  pastPosts: [3, 4],
  scheduledDateTime: '',
  updatingPostId: undefined,
  newPostModal: false,
  calendarView: false,
  isLoading: false,
};






describe('Boolean togglers', () => {
  it('works on modal toggler', () => {
    expect(
      reducer(
        { newPostModal: false }, 
        { type: 'TOGGLE_MODAL' }
    ))
    .to.deep.equal({
      newPostModal: true
    });
  });

  it('works on spinner toggler', () => {
    expect(
      reducer(
        { isLoading: true }, 
        { type: 'TOGGLE_LOADER' }
    ))
    .to.deep.equal({
      isLoading: false
    });
  });

  it('works on calendar view toggler', () => {
    expect(
      reducer(
        { calendarView: true }, 
        { type: 'SWITCH_SCHEDULED_VIEW' }
    ))
    .to.deep.equal({
      calendarView: false 
    });
  });

  it('works on twitter toggle', () => {
    expect(
      reducer(
        { postToTwitter: false }, 
        { type: 'TW_TOGGLE' }
    ))
    .to.deep.equal({
      postToTwitter: true 
    });
  });

  it('works on facebook toggle', () => {
    expect(
      reducer(
        { postToFacebook: false }, 
        { type: 'FB_TOGGLE' }
    ))
    .to.deep.equal({
      postToFacebook: true 
    });
  });
})





describe('large state changes', () => {
  it('works on successful user login', () => {
    expect(
      reducer(
        initialState,
        { type: 'GET_USER_INFO_SUCCESS', 
          payload: {
            data: {
              email: 'anemail@account.com',
              isLoggedIn: true, 
              twitter: true,
              facebook: true,
              scheduledPosts: [1, 2],
              pastPosts: [3, 4]
            }
          }
        }
      )
    )
  .to.deep.equal(afterUserInfoSuccess);
  });
});



describe('small changes', () => {
  it('works on clear_img', () => {
    expect(
      reducer(
        { otherState: 'unique',
          img: 'filled',
          imgUrl: 'filled'
        },
        { type: 'CLEAR_IMG', }
    ))
  .to.deep.equal({
      otherState: 'unique',
      img: '',
      imgUrl: '' 
    });
  });

  it('works on text change', () => {
    expect(
      reducer(
        { otherState: 'unique 3486',
          text: 'any other possible text'
        },
        { type: 'TEXT_CHANGE',
          payload: 'NEW CHANGED MESSAGE HERE' }
    ))
    .to.deep.equal({
      otherState: 'unique 3486',
      text: 'NEW CHANGED MESSAGE HERE'
    });
  });

  it('works on img update', () => {
    expect(
      reducer(
        afterUserInfoSuccess,
        { type: 'UPLOAD_IMG',
          payload: {
            img: 'img1',
            imgUrl: 'img2'
          }
        }
      )
    )
    .to.deep.equal(afterImageUpload);
  });
})


let random;
describe('keeps state unchanged', () => {
  random = new Date().toString();

  it('by default, eg: NONSENSE_ACTION', () => {
    expect(
      reducer(
        { madeUpStateVariable: random },
        { type: 'NONSENSE_ACTION' }
      )
    )
    .to.deep.equal({
      madeUpStateVariable: random
    })
  });

  it('in reponse to GET_USER_INFO_FAIL', () => {
    expect(
      reducer(
        { madeUpStateVariable: random },
        { type: 'GET_USER_INFO_FAIL' }
      )
    )
    .to.deep.equal({
      madeUpStateVariable: random
    })
  });
})

