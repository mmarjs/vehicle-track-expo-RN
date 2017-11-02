import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { logout } from '../../Redux/Actions/Auth';

class LogoutScreen extends React.Component {
  async componentWillMount() {
    await this.props.logout();
  }

  componentDidUpdate() {
    this.goToLogin();
  }

  goToLogin = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'LoginScreen',
      params: {},

      // navigate can have a nested navigate action that will be run inside the child router
      action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
    })
    this.props.navigation.dispatch(navigateAction)
  }


  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutScreen);
