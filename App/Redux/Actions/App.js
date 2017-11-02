import {
  APP_STATE_LOADING,
  APP_STATE_ERROR,
  APP_STATE_READY,
  APP_HAS_LOCATION,
  APP_NO_LOCATION,
} from '../Constants/App';
import { getLocation } from '../../Lib/Locations';

export function appLoading() {
  return {
    type: APP_STATE_LOADING,
  };
}

export function appLoadError(error = null) {
  return {
    type: APP_STATE_ERROR,
    error: error,
  };
}

export function appReady() {
  return {
    type: APP_STATE_READY,
  };
}

export function appHasLocation(location) {
  return {
    type: APP_HAS_LOCATION,
    location: location,
  };
}

export function appNoLocation(error) {
  return {
    type: APP_NO_LOCATION,
    error: error,
  };
}

export function appGetLocation() {
  return async (dispatch) => {
    await getLocation()
      .then((location) => {
        dispatch(appHasLocation(location));
      })
      .catch(error => appNoLocation(error));
  };
}
