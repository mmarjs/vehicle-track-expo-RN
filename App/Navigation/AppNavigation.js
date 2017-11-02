import { StackNavigator } from 'react-navigation';
import SplashScreen from '../Containers/SplashScreen';
import LoginScreen from '../Containers/Auth/LoginScreen';
import DrawerNavigation from './DrawerNavigation';

const NavigatorRoutes = {
  SplashScreen: { screen: SplashScreen },
  LoginScreen: { screen: LoginScreen },
  DrawerNavigation: { screen: DrawerNavigation },
};

const NavigatorConfig = {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
};

const AppNavigation = StackNavigator(NavigatorRoutes, NavigatorConfig);

export default AppNavigation;
