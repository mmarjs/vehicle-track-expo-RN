import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAddress } from '../../Services/Orca/Lib/Vehicles';


class VehicleListRow extends React.Component {
  openDetails = (vehicle) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'VehicleStops',
      params: { vehicle },
    });
    this.props.navigation.dispatch(navigateAction);
  }

  openMapToVehicle = (destinationLat, destinationLng) => {
    const userLat = this.props.appState.location.latitude;
    const userLng = this.props.appState.location.longitude;
    const url = `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}&saddr=${userLat},${userLng}&z=14&t=m`;
    Linking.openURL(url)
    .catch(err => console.error('An error occurred', err));
  }

  render() {
    const vehicle = this.props.vehicle;
    console.log(vehicle);

    let eventIcon = '';
    if (vehicle.EventTypeDescription === 'KEY_OFF') {
      eventIcon = (<Icon name="stop-circle-o" size={30} color="#ff0000" />);
    }

    const address = getAddress(vehicle);

    return (
      <View>
        <Text>{vehicle.VehicleName} {eventIcon}</Text>
        <Text>{address}</Text>
        <View>
          <Icon.Button
            name="list"
            onPress={() => this.openDetails(vehicle)}
          />
          <Icon.Button
            name="compass"
            onPress={() => this.openMapToVehicle(vehicle.GpsLatitude, vehicle.GpsLongitude)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

export default connect(
  mapStateToProps,
)(VehicleListRow);
