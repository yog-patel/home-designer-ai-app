import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './App.jsx';
import './index.css';

// Initialize Capacitor for native platforms
if (window.location.protocol === 'capacitor://') {
  import('@capacitor/core').then(({ Capacitor }) => {
    console.log('Capacitor initialized for native platform');
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
