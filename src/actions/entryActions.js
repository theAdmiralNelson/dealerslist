import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//import { thunk } from 'redux-thunk';
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
  SEARCH_EQUALS_SUCCESS
} from './types';

export const entryUpdate = ({ prop, value }) => {
  return {
    type: ENTRY_UPDATE,
    payload: { prop, value }
  };
};

export const entryCreate = ({ make, model, year, image, price, miles, description }) => {
  const { currentUser } = firebase.auth();
  const keys = firebase.database().ref(`/users/${currentUser.uid}/entries`)
    .push();
    //console.log("hiya");
  return (dispatch) => {
    keys.setWithPriority({ make, model, year, uid: keys.key, image, sold: false, price, miles, description }, 0 - Date.now())
    .then(() => {
      dispatch({ type: ENTRY_CREATE });
      //console.log(this.props.image);
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
//console.log(make, model, year, uid, sold, price, miles, description);
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .set({ make, model, year, image, sold, price, miles, description })
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS });
        Actions.main({ type: 'reset' });
      });
  };
};

export const soldEntrySave = ({ make, model, year, uid, image, sold, price, miles, description }) => {
  const { currentUser } = firebase.auth();
//console.log(make, model, year, uid, sold, price, miles, description);
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
        Actions.main({ type: 'reset' });
      });
  };
};


export const searchChanged = (value) => {
  //const { search } = this.props;
  return (dispatch) => {
    dispatch({ type: SEARCH_CHANGED,
    payload: value
  });
    searchEquals(dispatch);
  };
};


export const searchResult = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {

    firebase.database().ref(`/users/${currentUser.uid}/entries`)
    .orderByValue()
      .on('value', snapshot => {
          const myObj = snapshot.val();
            //const element = 'John';
            //console.log(data);

      //const list = _.pickBy(myObj, (((value) => value.make.indexOf(element) !== -1 || value.model.indexOf(element) !== -1) && ((value) => value.sold === false)));


        dispatch({ type: SEARCH_RESULT_SUCCESS, payload: myObj });
      });
  };
};

 const searchEquals = ({ items, search }) => {
   //console.log("maybe");
   //const element = 'John';
  const list = _.pickBy(items, (((value) => value.items.make.indexOf(search) !== -1 || value.items.model.indexOf(search) !== -1) && ((value) => value.items.sold === false)));
  return (dispatch) => {
  dispatch({ type: SEARCH_EQUALS_SUCCESS, payload: list });
  };
};

export const soldResult = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries`)
    .orderByChild('uid')
      .on('value', snapshot => {
          const myObj = snapshot.val();
          const element = 'John';
          const list = _.pickBy(myObj, (((value) => value.make.indexOf(element) !== -1 || value.model.indexOf(element) !== -1) && ((value) => value.sold === true)));


        dispatch({ type: SOLD_RESULT_SUCCESS, payload: list });
      });
  };
};
