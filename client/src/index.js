import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from '../store';

const root = document.getElementById('root');

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, root)
