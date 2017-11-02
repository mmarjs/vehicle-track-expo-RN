import { AsyncStorage } from 'react-native';

export async function getAuthToken() {
  const authToken = await AsyncStorage.getItem('AUTH_TOKEN');
  return authToken;
}

export async function deleteAuthToken() {
  return AsyncStorage.removeItem('AUTH_TOKEN');
}

export async function setAuthToken(authToken) {
  if (!authToken) {
    return deleteAuthToken();
  }
  return AsyncStorage.setItem('AUTH_TOKEN', authToken);
}

export async function getIsUserLoggedIn() {
  const authToken = await getAuthToken();

  if (!authToken) {
    return false;
  }

  return authToken;
}
