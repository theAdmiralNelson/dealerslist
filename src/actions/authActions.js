import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_ADCHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER_PAGE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER,
  RESET_PASSWORD,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL

 } from './types';

 export const createUserPage = (error) => {
       return {
         type: CREATE_USER_PAGE,
         payload: error
       };
     };

 export const logoutUser = () => {
       return (dispatch) => {
         dispatch({
           type: LOGOUT_USER,
         });
       firebase.auth().signOut()
         .then(() => logoutUserSuccess(dispatch))
           .catch(() => logoutUserFail(dispatch));
       };
 };


 export const emailAdChanged = (text) => {
   return {
     type: EMAIL_ADCHANGED,
     payload: text
   };
 };


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const createUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => createUserSuccess(dispatch, user))
        .catch(() => createUserFail(dispatch));
  };
};

const createUserSuccess = (dispatch, user) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const createUserFail = (dispatch) => {
  dispatch({ type: CREATE_USER_FAIL });
};

const passwordSuccess = (dispatch) => {
  dispatch({
    type: PASSWORD_SUCCESS,
  });

  Actions.auth();
};

const passwordFail = (dispatch) => {
  dispatch({
    type: PASSWORD_FAIL
  });
};

const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: LOGOUT_USER_SUCCESS,
  });

  Actions.auth();
};

const logoutUserFail = (dispatch) => {
  dispatch({ type: LOGOUT_USER_FAIL });
};

export const resetPassword = ({ emailAd }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });

      firebase.auth().sendPasswordResetEmail(emailAd)
        .then(() => passwordSuccess(dispatch))
          .catch(() => passwordFail(dispatch));
  };
};
