import io from 'socket.io-client';
import store, { getRequestsFromServer } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am connected to the server');
  socket.on('update-requests', () => {
    store.dispatch(getRequestsFromServer())
  })
});

export default socket;
