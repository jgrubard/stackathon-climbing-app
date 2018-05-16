import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './users';

const reducer = combineReducers({
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;

export * from './users';
