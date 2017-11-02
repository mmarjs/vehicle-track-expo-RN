import {
  APP_STATE_LOADING,
  APP_STATE_ERROR,
  APP_STATE_READY,
  APP_HAS_LOCATION,
  APP_NO_LOCATION,
} from '../Constants/App';

const initialState = {
  isReady: false,
  hasError: false,
  error: null,
  location: {
    hasLocation: false,
    latitude: 45.5057646,
    longitude: -73.5850421,
  },
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case APP_STATE_LOADING:
      return {
        ...state,
        isReady: false,
      };

    case APP_STATE_ERROR:
      return {
        ...state,
        isReady: false,
        hasError: true,
        error: action.error,
      };

    case APP_STATE_READY:
      return {
        ...state,
        isReady: true,
        hasError: false,
      };

    case APP_HAS_LOCATION:
      return {
        ...state,
        location: {
          hasLocation: true,
          latitude: action.location.coords.latitude,
          longitude: action.location.coords.longitude,
        },
      };

    case APP_NO_LOCATION:
      return {
        ...state,
        location: {
          hasLocation: false,
          latitude: initialState.location.latitude,
          longitude: initialState.location.longitude,
        },
      };

    default:
      return state;
  }
};

export default appState;
