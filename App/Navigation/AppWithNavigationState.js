import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigation from './AppNavigation';

class App extends React.Component {
  render() {
    return (
      <AppNavigation
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
