import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, Linking, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../i18n';
import { getVehicleStops } from '../../Redux/Actions/Vehicles';
import VehiclesLoading from '../../Components/Vehicles/VehiclesLoading';
import VehiclesError from '../../Components/Vehicles/VehiclesError';
import VehicleStopRow from '../../Components/Vehicles/VehicleStopRow';
import { getAddress } from '../../Services/Orca/Lib/Vehicles';

class VehicleStopsScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('Vehicles Stops'),
    headerTitleStyle: { alignSelf: 'center' },
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this.refreshStops = this.refreshStops.bind(this);
  }

  componentWillMount = async () => {
    const vehicle = this.props.navigation.state.params.vehicle;
    this.props.getVehicleStops(vehicle.VehicleId);
  }

  getKeyExtractor = item => item.EventId;

  refreshStops() {
    const vehicle = this.props.navigation.state.params.vehicle;
    this.props.getVehicleStops(vehicle.VehicleId);
  }

  openMapToVehicle = (destinationLat, destinationLng) => {
    const userLat = this.props.appState.location.latitude;
    const userLng = this.props.appState.location.longitude;
    const url = `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}&saddr=${userLat},${userLng}&z=14&t=m`;
    Linking.openURL(url)
    .catch(err => console.error('An error occurred', err));
  }

  renderItem = item => (<VehicleStopRow
    navigation={this.props.navigation}
    event={item.item}
  />);

  render() {
    const vehicle = this.props.navigation.state.params.vehicle;
    const title = vehicle.VehicleName;
    const address = getAddress(vehicle);
    const description = address;

    if (this.props.vehicles.hasError) {
      return (
        <VehiclesError />
      );
    }

    if (!this.props.vehicles.isReady) {
      return (
        <VehiclesLoading />
      );
    }

    return (
      <View>
        <Text>{title}</Text>
        <View>
          <Text>{description}</Text>
          <View>
            <Icon.Button
              name="compass"
              onPress={() => this.openMapToVehicle(vehicle.GpsLatitude, vehicle.GpsLongitude)}
            />
          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshStops}
            />
          }
          data={this.props.vehicles.stops}
          keyExtractor={this.getKeyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
    vehicles: state.vehicles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVehicleStops: vehicleID => dispatch(getVehicleStops(vehicleID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleStopsScreen);
