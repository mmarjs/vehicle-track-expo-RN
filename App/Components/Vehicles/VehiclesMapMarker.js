import Expo from 'expo';
import React from 'react';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAddress } from '../../Services/Orca/Lib/Vehicles';

export default class VehiclesMapMarker extends React.Component {
  openDetails = (vehicle) => {
    // console.log(vehicle);
    const navigateAction = NavigationActions.navigate({
      routeName: 'VehicleStops',
      params: { vehicle },
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const vehicle = this.props.vehicle;
    const title = vehicle.VehicleName;
    const address = getAddress(vehicle);
    const description = address;
    // console.log(vehicle);

    if (!(vehicle.GpsLatitude && vehicle.GpsLongitude)) {
      return null;
    }

    const coordinate = {
      latitude: vehicle.GpsLatitude,
      longitude: vehicle.GpsLongitude,
    };

    return (
      <Expo.MapView.Marker
        coordinate={coordinate}
        title={title}
        description={description}
        image={<Icon name="map-marker" />}
      >
        <Expo.MapView.Callout
          tooltip={true}
          onPress={() => this.openDetails(vehicle)}
        />
      </Expo.MapView.Marker>
    );
  }
}
