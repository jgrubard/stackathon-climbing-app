import axios from 'axios';
import { GET_REQUESTS, CREATE_REQUEST, DELETE_REQUEST } from './actionTypes';
import socket from '../socket'

const getRequests = (requests) => ({ type: GET_REQUESTS, requests });
const createRequest = (request) => ({ type: CREATE_REQUEST, request});
const deleteRequest = (request) => ({ type: DELETE_REQUEST, request});

export const getRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/requests')
      .then(res => res.data)
      .then(requests => dispatch(getRequests(requests)))
  }
}

export const createRequestOnServer = (request) => {
  return dispatch => {
    return axios.post('/api/requests', request)
      .then(res => res.data)
      .then(request => {
        dispatch(createRequest(request))
        socket.emit('get-request', request)
      })
  }
}

export const deleteRequestOnServer = (request) => {
  return dispatch => {
    return axios.delete(`/api/requests/${request.id}`)
      .then(() => {
        dispatch(deleteRequest(request))
        socket.emit('remove-request', request)
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
    case DELETE_REQUEST:
      state = state.filter(request => request.id !== action.request.id);
      break;
  }
  return state;
}

export default requestsReducer;
