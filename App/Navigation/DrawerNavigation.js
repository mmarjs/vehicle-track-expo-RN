import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../i18n';
import VehiclesMapScreen from '../Containers/Vehicles/VehiclesMapScreen';
import VehiclesListScreen from '../Containers/Vehicles/VehiclesListScreen';
import VehicleStopsScreen from '../Containers/Vehicles/VehicleStopsScreen';
import LogoutScreen from '../Containers/Auth/LogoutScreen';

const VehiclesMapNav = StackNavigator({
  VehiclesMap: {
    screen: VehiclesMapScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    }),
  },
  VehicleStops: { screen: VehicleStopsScreen },
}, {
  initialRouteName: 'VehiclesMap',
});

const VehiclesListNav = StackNavigator({
  VehiclesList: { screen: VehiclesListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    }),
  },
  VehicleStops: { screen: VehicleStopsScreen },
}, {
  initialRouteName: 'VehiclesList',
  headerMode: 'screen',
});

const DrawerNavigatorRoute = {
  VehiclesMap: {
    screen: VehiclesMapNav,
    navigationOptions: () => ({
      drawerLabel: I18n.t('Vehicles Map'),
      drawerIcon: <Icon name="map" size={35} />,
    }),
  },
  VehiclesList: {
    screen: VehiclesListNav,
    navigationOptions: () => ({
      drawerLabel: I18n.t('Vehicles List'),
      drawerIcon: <Icon name="list" size={35} />,
    }),
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: () => ({
      drawerLabel: I18n.t('Logout'),
      drawerIcon: <Icon name="sign-out" size={35} />,
    }),
  },
};

const DrawerConfig = {
  initialRouteName: 'VehiclesMap',
};

export default DrawerNavigator(DrawerNavigatorRoute, DrawerConfig);
