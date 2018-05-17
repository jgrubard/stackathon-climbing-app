import axios from 'axios';
import { GET_REQUESTS, CREATE_REQUEST } from './actionTypes';

const getRequests = (requests) => ({ type: GET_REQUESTS, requests });
const createRequest = (request) => ({ type: CREATE_REQUEST, request});

export const getRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/requests')
      .then(res => res.data)
      .then(requests => dispatch(getRequests(requests)))
  }
}

export const createRequestOnServer = (request) => {
  console.log('THUNK:', request);
  return dispatch => {
    return axios.post('/api/requests', request)
      .then(res => {
        console.log('res.data:', res.data)
        return res.data
      })
      .then(request => {
        console.log('before dispatch:', request)
        dispatch(createRequest(request))
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
  }
  return state;
}

export default requestsReducer;
