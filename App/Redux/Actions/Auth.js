import OrcaAPI from '../../Services/Orca/Api';

import {
  getIsUserLoggedIn,
  deleteAuthToken,
  setAuthToken,
} from '../../Services/Orca/Lib/Auth';

import {
  AUTHENTICATING,
  AUTH_ERROR,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
} from '../Constants/Auth';

export function authenticating() {
  return {
    type: AUTHENTICATING,
  };
}

export function authError(error = null) {
  return {
    type: AUTH_ERROR,
    error: error,
  };
}

export function authenticated(authToken) {
  return {
    type: AUTHENTICATED,
    authToken: authToken,
  };
}

export function notAuthenticated() {
  return {
    type: NOT_AUTHENTICATED,
  };
}

export function validateAuth() {
  return dispatch =>
    getIsUserLoggedIn()
      .then((authToken) => {
        if (authToken) {
          dispatch(authenticated(authToken));
        } else {
          dispatch(notAuthenticated());
        }
        return authToken;
      })
      .catch(error => authError(error));
}

export function logout() {
  return (dispatch) => {
    dispatch(authenticating());
    deleteAuthToken()
      .then(() => {
        dispatch(notAuthenticated);
      })
      .catch(error => authError(error));
  };
}

export const login = (email, password) => async (dispatch) => {
  dispatch(authenticating());

  const api = new OrcaAPI();
  await api.doLogin(email, password)
    .then((authToken) => {
      setAuthToken(authToken)
        .then(dispatch(authenticated(authToken)));
    })
    .catch(error => authError(error));
};
