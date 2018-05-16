import { GET_USERS } from './actionTypes';
import axios from 'axios';

const getUsers = (users) => ({ type: GET_USERS, users })

export const getUsersFromServer = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)))
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      state = action.users;
      break;
  }
  return state;
}

export default usersReducer;
