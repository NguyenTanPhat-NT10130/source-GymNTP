// redux
import { createStore, combineReducers, applyMiddleware} from 'redux';
//import thunk from 'redux-thunk'; // for version 2.x
const thunk = require('redux-thunk').thunk; // for version 3.x
import logger from 'redux-logger';
// reducers
import { monthly } from './monthly';
import {session} from './session';
import {trainer} from './trainer';
import { cartReducer } from './cart';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ monthly, session, trainer, cart: cartReducer}),
    applyMiddleware(thunk, logger)
  );
  return store;
};