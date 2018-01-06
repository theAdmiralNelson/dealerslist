import {
  LOADING_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  load: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_SUCCESS:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
        return state;
  }
};
