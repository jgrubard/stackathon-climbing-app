import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './users';
import userReducer from './user';
import gymsReducer from './gyms';
import requestsReducer from './requests';

const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  gyms: gymsReducer,
  requests: requestsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))//, logger))

export default store;

export * from './users';
export * from './user';
export * from './gyms';
export * from './requests';
