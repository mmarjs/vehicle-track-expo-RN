import Expo from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import I18n from '../../i18n';
import VehiclesLoading from '../../Components/Vehicles/VehiclesLoading';
import VehiclesError from '../../Components/Vehicles/VehiclesError';
import VehiclesMapMarker from '../../Components/Vehicles/VehiclesMapMarker';
import { getVehiclesLocations } from '../../Redux/Actions/Vehicles';
import styles from '../../Styles/Theme';

class VehiclesMapScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('Vehicles Map'),
    headerTitleStyle: { alignSelf: 'center' },
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 45.5057646,
        longitude: -73.5850421,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      },
    };
  }

  componentWillMount = async () => {
    // Get activities
    this.props.getVehiclesLocations(this.props.appState.location);

    // Set region
    const region = {
      ...this.state.region,
      latitude: this.props.appState.location.latitude,
      longitude: this.props.appState.location.longitude,
    };
    // console.log(region);

    this.setState({
      region: region,
    });
  }

  refreshVehicles() {
    this.props.getVehiclesLocations(this.props.appState.location);
  }

  render() {
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
      <Expo.MapView
        style={styles.mapview}
        region={this.state.region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        zoomEnabled={true}
        rotateEnabled={false}
      >
        {this.props.vehicles.vehicles.map(vehicle => (
          <VehiclesMapMarker
            key={vehicle.VehicleId}
            navigation={this.props.navigation}
            vehicle={vehicle}
          />
        ))}
      </Expo.MapView>
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
    getVehiclesLocations: location => dispatch(getVehiclesLocations(location)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehiclesMapScreen);
