import OrcaAPI from '../../Services/Orca/Api';

import {
  VEHICLES_LOADING,
  VEHICLES_LOAD_ERROR,
  VEHICLES_LOADED,
  VEHICLE_STOPS_LOADING,
  VEHICLE_STOPS_LOAD_ERROR,
  VEHICLE_STOPS_LOADED,
} from '../Constants/Vehicles';

import { getAuthToken } from '../../Services/Orca/Lib/Auth';

export function vehiclesLoading() {
  return {
    type: VEHICLES_LOADING,
  };
}

export function vehiclesLoadError(error = null) {
  return {
    type: VEHICLES_LOAD_ERROR,
    error: error,
  };
}

export function vehiclesLoaded(vehicles) {
  return {
    type: VEHICLES_LOADED,
    vehicles: vehicles,
  };
}

export function vehicleStopsLoading() {
  return {
    type: VEHICLE_STOPS_LOADING,
  };
}

export function vehicleStopsLoadError(error = null) {
  return {
    type: VEHICLE_STOPS_LOAD_ERROR,
    error: error,
  };
}

export function vehicleStopsLoaded(stops) {
  return {
    type: VEHICLE_STOPS_LOADED,
    stops: stops,
  };
}

export function getVehiclesLocations(coordinate) {
  return async (dispatch) => {
    const authToken = await getAuthToken();
    const api = new OrcaAPI(authToken);

    await api.getVehiclesLocations(coordinate)
      .then((vehicles) => {
        dispatch(vehiclesLoaded(vehicles));
      })
      .catch(error => vehiclesLoadError(error));
  };
}

export function getVehicleStops(vehicleID) {
  return async (dispatch) => {
    const authToken = await getAuthToken();
    const api = new OrcaAPI(authToken);

    await api.getVehicleStops(vehicleID)
      .then((stops) => {
        dispatch(vehicleStopsLoaded(stops));
      })
      .catch(error => vehicleStopsLoadError(error));
  };
}
