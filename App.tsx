import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Home } from './src/containers';
import { Provider } from 'react-redux';
import { store } from './src/redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
