import axios from 'axios';
import { GET_GYMS } from './actionTypes';

const getGyms = (gyms) => ({ type: GET_GYMS, gyms })

export const getGymsFromServer = () => {
  return dispatch => {
    return axios.get('/api/gyms')
      .then(res => res.data)
      .then(gyms => dispatch(getGyms(gyms)))
  }
}

const gymsReducer = (state = [], action) => {
  switch(action.type) {
    case GET_GYMS:
      state = action.gyms;
      break;
  }
  return state;
}

export default gymsReducer;
