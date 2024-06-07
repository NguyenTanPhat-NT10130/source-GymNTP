import * as ActionTypes from './ActionTypes';

export const monthly = (state = { isLoading: true, errMess: null, monthly: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MONTHLY:
      return { ...state, isLoading: false, errMess: null, monthly: action.payload };
    case ActionTypes.MONTHLY_LOADING:
      return { ...state, isLoading: true, errMess: null, monthly: [] }
    case ActionTypes.MONTHLY_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};