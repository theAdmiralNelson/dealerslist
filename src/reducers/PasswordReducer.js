import {
  EMAIL_ADCHANGED,
  RESET_PASSWORD,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL
 } from '../actions/types';

const INITIAL_STATE = {
  emailAd: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_ADCHANGED:
      return { ...state, emailAd: action.payload };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case PASSWORD_SUCCESS:
      return { ...state,
        error: '',
        loading: false,
        emailAd: ''
       };
    case PASSWORD_FAIL:
      return { ...state, error: 'Failed To Send Email', loading: false, emailAd: '' }
    default:
      return state;
  }
};
