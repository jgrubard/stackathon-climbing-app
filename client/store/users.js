import { GET_USERS, CREATE_USER, UPDATE_USER } from './actionTypes';
import axios from 'axios';
import socket from '../socket'

const getUsers = (users) => ({ type: GET_USERS, users });
const createUser = (user) => ({ type: CREATE_USER, user});
const updateUser = (user) => ({ type: UPDATE_USER, user});

export const getUsersFromServer = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)))
  }
}

export const updateUserOnServer = (user) => {
  const { id } = user;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/users/${id}` : '/api/users';
  const action = id ? updateUser : createUser;
  return dispatch => {
    return axios[method](url, user)
      .then(res => res.data)
      .then(user => {
        dispatch(action(user))
        socket.emit('update-users');
      })
      .catch(err => console.log({ err }))
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      state = action.users;
      break;
    case CREATE_USER:
      state = [ ...state, action.user ];
      break;
    case UPDATE_USER:
      state = [ ...state.filter(user => user.id !== action.user.id), action.user ]
  }
  return state;
}

export default usersReducer;
