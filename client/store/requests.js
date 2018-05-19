import axios from 'axios';
import { GET_REQUESTS, CREATE_REQUEST, UPDATE_REQUEST, DELETE_REQUEST } from './actionTypes';
import socket from '../socket'

const getRequests = (requests) => ({ type: GET_REQUESTS, requests });
const createRequest = (request) => ({ type: CREATE_REQUEST, request });
const updateRequest = (request) => ({ type: UPDATE_REQUEST, request });
const deleteRequest = (request) => ({ type: DELETE_REQUEST, request });

export const getRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/requests')
      .then(res => res.data)
      .then(requests => dispatch(getRequests(requests)))
  }
}

export const updateRequestOnServer = (request) => {
  const { id } = request;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/requests/${request.id}` : '/api/requests';
  const action = id ? updateRequest : createRequest;
  return dispatch => {
    return axios[method](url, request)
      .then(res => res.data)
      .then(request => {
        dispatch(action(request))
        // socket.emit('update-requests')
      })
      .then(() => {
        // dispatch(getRequestsFromServer())
        socket.emit('update-requests')
      })
      // .then(() => {
        // socket.emit('update-requests')
        // dispatch(getRequestsFromServer())
      // })
      .catch(err => console.error({err}))
  }
}

export const deleteRequestOnServer = (request) => {
  return dispatch => {
    return axios.delete(`/api/requests/${request.id}`)
      .then(() => {
        dispatch(deleteRequest(request))
        socket.emit('update-requests')
      })
  }
}

const requestsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REQUESTS:
      state = action.requests;
      break;
    case CREATE_REQUEST:
      state = [ ...state, action.request ];
      break;
    case UPDATE_REQUEST:
      state = [ ...state.filter(request => request.id !== action.request.id), action.request ];
      break;
    case DELETE_REQUEST:
      state = state.filter(request => request.id !== action.request.id);
      break;
  }
  return state;
}

export default requestsReducer;
