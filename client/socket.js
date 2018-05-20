import io from 'socket.io-client';
import store, { getRequestsFromServer, getUsersFromServer } from './store';
import { notifyAccepted, notifyRequest } from './store/reusableFunctions'

const socket = io(window.location.origin);

socket.on('connect', () => {
  socket.on('update-requests', () => {
    store.dispatch(getRequestsFromServer())
  })
  socket.on('update-users', () => {
    store.dispatch(getUsersFromServer())
  })
  socket.on('notify-accepted', (name) => {
    notifyAccepted(name);
  })
  socket.on('notify-request', (name) => {
    notifyRequest(name);
  })
});

export default socket;
