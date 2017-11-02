import {
  AUTHENTICATING,
  AUTH_ERROR,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
} from '../Constants/Auth';

const initialState = {
  isAuthenticated: false,
  isReady: false,
  hasError: false,
  error: null,
  authToken: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        isReady: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isReady: false,
        hasError: true,
        error: action.error,
      };

    case AUTHENTICATED:
      return {
        ...state,
        isReady: true,
        hasError: false,
        isAuthenticated: true,
        authToken: action.authToken,
      };

    case NOT_AUTHENTICATED:
      return {
        ...state,
        isReady: true,
        hasError: false,
        isAuthenticated: false,
        authToken: null,
      };

    default:
      return state;
  }
};

export default auth;
