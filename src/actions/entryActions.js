import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import {
  ENTRY_UPDATE,
  ENTRY_CREATE,
  ENTRY_FETCH_SUCCESS,
  ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR,
  SEARCH_RESULT_SUCCESS,
  SEARCH_CHANGED,
  SOLD_RESULT_SUCCESS,
  SOLD_ENTRY_SAVE_SUCCESS,
  LOADING_SUCCESS,
  LOAD_TRUE,
  LOAD_FALSE
} from './types';


export const entryUpdate = ({ prop, value }) => {
  return {
    type: ENTRY_UPDATE,
    payload: { prop, value }
  };
};

export const loadingSuccess = ({ prop, value }) => {
  return {
    type: LOADING_SUCCESS,
    payload: {
      payload: { prop, value }
    }
  };
};

export const entryCreate = ({ make, model, year, image, price, miles, description }) => {
  const { currentUser } = firebase.auth();
  const keys = firebase.database().ref(`/users/${currentUser.uid}/entries`)
    .push();

    return (dispatch) => {
    keys.setWithPriority({
      make,
      model,
      year,
      uid: keys.key,
      image,
      sold: false,
      price,
      miles,
      description
    }, 0 - Date.now())
      .then(() => {
        dispatch({ type: ENTRY_CREATE });

      Actions.main({ type: 'reset' });
    });
  };
};


export const entryFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries`)
      .on('value', snapshot => {
        dispatch({ type: ENTRY_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const entrySave = ({ make, model, year, uid, image, sold, price, miles, description }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .set({ make, model, year, image, sold, price, miles, description })
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });
  };
};

export const soldEntrySave = ({
  make,
  model,
  year,
  uid,
  image,
  sold,
  price,
  miles,
  description
}) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .set({ make, model, year, image, sold, price, miles, description })
      .then(() => {
        dispatch({ type: SOLD_ENTRY_SAVE_SUCCESS });
      });
  };
};

export const entryClear = ({ prop, value }) => {
  return {
    type: ENTRY_CLEAR,
    payload: { prop, value }

  };
};

export const entryDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .remove()
      .then(() => {
        Actions.pop({ type: 'reset' });
      });
  };
};


export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  };
};


export const searchResult = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {

    firebase.database().ref(`/users/${currentUser.uid}/entries`)
      .orderByChild('uid')
      .on('value', snapshot => {
          const myObj = snapshot.val();
          dispatch({ type: SEARCH_RESULT_SUCCESS, payload: myObj });
      });
  };
};


export const soldResult = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries`)
    .orderByChild('uid')
      .on('value', snapshot => {
          const myObj = snapshot.val();
          const list = _.pickBy(myObj, ((value) => value.sold === true));

        console.log(myObj);
        dispatch({ type: SOLD_RESULT_SUCCESS, payload: list });
      });
  };
};

export const loadFalse = () => {
  return {
    type: LOAD_FALSE,
  };
};

export const loadTrue = () => {
  return {
    type: LOAD_TRUE,
  };
};
