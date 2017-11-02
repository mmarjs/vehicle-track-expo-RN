import { filterArray } from '../../../Lib/Arrays';

export function getAddress(vehicle) {
  return filterArray([vehicle.AddressStreet, vehicle.AddressCity, vehicle.AddressProvince]).join(', ');
}
