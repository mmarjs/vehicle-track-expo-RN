import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, RefreshControl } from 'react-native';
import I18n from '../../i18n';
import VehiclesLoading from '../../Components/Vehicles/VehiclesLoading';
import VehiclesError from '../../Components/Vehicles/VehiclesError';
import VehicleListRow from '../../Components/Vehicles/VehicleListRow';
import { getVehiclesLocations } from '../../Redux/Actions/Vehicles';
import styles from '../../Styles/Theme';

class VehiclesListScreen extends React.Component {
  static navigationOptions = {
    title: I18n.t('Vehicles List'),
    headerTitleStyle: { alignSelf: 'center' },
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    this.refreshVehicles = this.refreshVehicles.bind(this);
  }

  componentWillMount = async () => {
    // Initially get them on map screen
    // this.props.getVehiclesLocations(this.props.appState.location);
  }

  getKeyExtractor = item => item.VehicleId;

  refreshVehicles() {
    this.props.getVehiclesLocations(this.props.appState.location);
  }

  renderItem = item => (<VehicleListRow
    navigation={this.props.navigation}
    vehicle={item.item}
  />);

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
      <View style={styles.listview}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshVehicles}
            />
          }
          data={this.props.vehicles.vehicles}
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
    getVehiclesLocations: location => dispatch(getVehiclesLocations(location)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehiclesListScreen);
