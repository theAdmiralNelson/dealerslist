import {
  SEARCH_RESULT_SUCCESS,
  ENTRY_FETCH_SUCCESS,
  SOLD_RESULT_SUCCESS,
  SEARCH_CHANGED,
  SEARCH_EQUALS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENTRY_FETCH_SUCCESS:
      return action.payload;
    case SEARCH_RESULT_SUCCESS:
      return action.payload;
    case SOLD_RESULT_SUCCESS:
      return action.payload;
    case SEARCH_EQUALS_SUCCESS:
     return { ...state, items: action.payload };
    default:
      return state;
  }
};
