import io from 'socket.io-client';
import store, { getRequestsFromServer, getUsersFromServer } from './store';
import { notify } from './store/reusableFunctions'

const socket = io(window.location.origin);

socket.on('connect', () => {
  socket.on('update-requests', () => {
    store.dispatch(getRequestsFromServer())
  })
  socket.on('update-users', () => {
    store.dispatch(getUsersFromServer())
  })
  socket.on('send-notification', (name) => {
    notify(name);
  })
});

export default socket;
