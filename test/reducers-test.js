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