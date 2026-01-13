import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/index.js';
import AppNavigator from './src/App.jsx';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}
