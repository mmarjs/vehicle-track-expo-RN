import { combineReducers } from 'redux';
import AppNavigation from '../../Navigation/AppNavigation';
import appState from './App';
import auth from './Auth';
import vehicles from './Vehicles';

const initialState = AppNavigation.router.getStateForAction(
  AppNavigation.router.getActionForPathAndParams('SplashScreen'),
);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigation.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const rootReducer = combineReducers({
  navigation: navReducer,
  appState: appState,
  auth: auth,
  vehicles: vehicles,
});

export default rootReducer;
