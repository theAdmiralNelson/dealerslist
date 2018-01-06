import {
  ENTRY_UPDATE,
  ENTRY_CREATE,
  ENTRY_SAVE_SUCCESS,
  SOLD_ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR,
  LOAD_TRUE,
  LOAD_FALSE
  //IMAGE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  make: '',
  model: '',
  year: '',
  image: '',
  sold: false,
  uid: '',
  price: '',
  miles: '',
  description: '',
  load: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENTRY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ENTRY_CREATE:
      return INITIAL_STATE;
    case ENTRY_SAVE_SUCCESS:
      return INITIAL_STATE;
      case SOLD_ENTRY_SAVE_SUCCESS:
        return INITIAL_STATE;
    case ENTRY_CLEAR:
      return INITIAL_STATE;
    case LOAD_TRUE:
        return { ...state, load: true };
    case LOAD_FALSE:
        return { ...state, load: false };


    //case SWITCH_CHANGED:
      //return { ...state, sold: action.payload.value };

    //case IMAGE_SAVE_SUCCESS:
      //return INITIAL_STATE;
    default:
        return state;
  }
};
