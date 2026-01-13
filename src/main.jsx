import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './App.jsx';
import './index.css';

// Debug logging
console.log('=== App Starting ===');
console.log('Platform:', window.location.protocol);
console.log('Environment vars loaded:', {
  hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
  hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
});

// Initialize Capacitor for native platforms
if (window.location.protocol === 'capacitor://') {
  console.log('Initializing Capacitor...');
  import('@capacitor/core').then(({ Capacitor }) => {
    console.log('Capacitor initialized for native platform');
  }).catch(err => console.error('Failed to initialize Capacitor:', err));
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Rendering app to #root element...');
const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

console.log('=== App Rendered ===');
