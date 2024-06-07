import * as ActionTypes from './ActionTypes';

export const session = (state = { isLoading: true, errMess: null, session: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SESSION:
      return { ...state, isLoading: false, errMess: null, session: action.payload };
    case ActionTypes.SESSION_LOADING:
      return { ...state, isLoading: true, errMess: null, session: [] }
    case ActionTypes.SESSION_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};