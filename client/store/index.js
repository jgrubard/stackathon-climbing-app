import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './users';
import userReducer from './user';
import gymsReducer from './gyms';

const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  gyms: gymsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;

export * from './users';
export * from './user';
export * from './gyms';
