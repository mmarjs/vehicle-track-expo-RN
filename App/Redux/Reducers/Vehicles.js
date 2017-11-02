import {
  VEHICLES_LOADING,
  VEHICLES_LOAD_ERROR,
  VEHICLES_LOADED,
  VEHICLE_STOPS_LOADING,
  VEHICLE_STOPS_LOAD_ERROR,
  VEHICLE_STOPS_LOADED,
} from '../Constants/Vehicles';

const initialState = {
  isReady: false,
  hasError: false,
  error: null,
  vehicles: [],
  trendingActivitiesLoading: false,
  trendingActivities: [],
  suggestedActivitiesLoading: false,
  suggestedActivities: [],
};

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case VEHICLES_LOADING:
      return {
        ...state,
        isReady: false,
      };

    case VEHICLES_LOAD_ERROR:
      return {
        ...state,
        isReady: false,
        hasError: true,
        error: action.error,
      };

    case VEHICLES_LOADED:
      return {
        ...state,
        isReady: true,
        hasError: false,
        vehicles: action.vehicles,
      };

    case VEHICLE_STOPS_LOADING:
      return {
        ...state,
        isReady: false,
      };

    case VEHICLE_STOPS_LOAD_ERROR:
      return {
        ...state,
        isReady: false,
        hasError: true,
        error: action.error,
      };

    case VEHICLE_STOPS_LOADED:
      return {
        ...state,
        isReady: true,
        hasError: false,
        stops: action.stops,
      };

    default:
      return state;
  }
};

export default vehicles;
