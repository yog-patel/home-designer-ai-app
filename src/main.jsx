import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './App.jsx';

console.log('=== Expo App Starting ===');

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
