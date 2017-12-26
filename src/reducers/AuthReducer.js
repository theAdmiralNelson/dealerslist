import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER,
  CREATE_USER_PAGE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL
 } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        email: '',
        password: ''
       };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Oops, that wasn\'t quite right.  Try again!', password: '', loading: false };
    case CREATE_USER_PAGE:
        return { ...state, error: '' };
    case CREATE_USER:
      return { ...state, loading: true, error: '' };
    case CREATE_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        error: '',
        loading: false,
        email: '',
        password: ''
        };
    case CREATE_USER_FAIL:
      return { ...state, error: 'Failed To Create Account. Try Again', password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT_USER_SUCCESS:
       return { ...state,
        user: null,
        error: '',
        loading: false,
        email: '',
        password: ''
       };
    case LOGOUT_USER_FAIL:
      return { ...state, error: 'Oops, you\'re still signed in.  Try again!' };
    default:
      return state;
  }
};
