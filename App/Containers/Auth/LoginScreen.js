import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../Styles/Theme';
import I18n from '../../i18n';
import { login } from '../../Redux/Actions/Auth';

const backgroundImage = require('../../../assets/backgrounds/login.png');

class LoginScreen extends React.Component {
  state = {
    email: 'rmenard@asplundhcanada.com',
    password: 'ro771me',
  }

  navigateTo = (routeName: string) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });
    this.props.navigation.dispatch(actionToDispatch);
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text });
  }

  handleChangePassword = (text) => {
    this.setState({ password: text });
  }

  handleLogin = async () => {
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    await this.props.login(email, password);
    this.navigateTo('DrawerNavigation');
  }

  render() {
    return (
      <Image source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.login}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="{I18n.t('Email')}"
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={text => this.handleChangeEmail(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="{I18n.t('Password')}"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={text => this.handleChangePassword(text)}
            />
          </View>

          <View>
            <Icon.Button name="sign-in" backgroundColor="#3b5998" onPress={() => this.handleLogin()}>
              {I18n.t('Login')}
            </Icon.Button>
          </View>
        </View>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
