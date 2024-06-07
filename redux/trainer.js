import * as ActionTypes from './ActionTypes';

export const trainer = (state = { isLoading: true, errMess: null, trainer: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TRAINER:
      return { ...state, isLoading: false, errMess: null, trainer: action.payload };
    case ActionTypes.TRAINER_LOADING:
      return { ...state, isLoading: true, errMess: null, trainer: [] }
    case ActionTypes.TRAINER_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};