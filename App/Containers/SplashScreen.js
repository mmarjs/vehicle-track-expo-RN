import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import I18n from 'ex-react-native-i18n';
import { appLoading, appReady, appGetLocation } from '../Redux/Actions/App';
import { validateAuth } from '../Redux/Actions/Auth';

const appIcon = require('../../assets/icons/app.png');

class SplashScreen extends React.Component {
  async componentWillMount() {
    this.props.appLoading();

    // Load translations
    await I18n.initAsync();

    // Get current location
    this.props.appGetLocation();

    // Check for auth token
    await this.props.validateAuth();

    this.props.appReady();
  }

  componentDidUpdate() {
    if (this.props.appState.isReady) {
      if (!this.props.auth.isAuthenticated) {
        this.navigateTo('LoginScreen');
      } else {
        this.navigateTo('DrawerNavigation');
      }
    }
  }

  navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  render() {
    return (
      <View>
        <Text>Orca by Geothentitic</Text>
        <Image source={appIcon} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  appLoading: () => dispatch(appLoading()),
  appReady: () => dispatch(appReady()),
  appGetLocation: () => dispatch(appGetLocation()),
  validateAuth: () => dispatch(validateAuth()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
