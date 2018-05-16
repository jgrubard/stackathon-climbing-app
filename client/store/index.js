import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './users';
import gymsReducer from './gyms';

const reducer = combineReducers({
  users: usersReducer,
  gyms: gymsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store;

export * from './users';
export * from './gyms';
