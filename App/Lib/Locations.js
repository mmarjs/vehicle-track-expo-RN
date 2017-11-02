import { Location, Permissions } from 'expo';

export function locationToCoordinate(location) {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export function regionToCoordinate(region) {
  return {
    latitude: region.latitude,
    longitude: region.longitude,
  };
}

export async function getLocation() {
  const permission = await Permissions.askAsync(Permissions.LOCATION);

  if (permission.status !== 'granted') {
    console.error('[Lib/locations.js] Permission to access location was denied');
  }

  return Location.getCurrentPositionAsync({});
}
