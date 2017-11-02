import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './App/Redux/configureStore';
import AppWithNavigationState from './App/Navigation/AppWithNavigationState';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
