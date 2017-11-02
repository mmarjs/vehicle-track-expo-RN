import axios from 'axios';

export default class OrcaAPI {
  constructor(authToken = null) {
    this.name = 'OrcaAPI';
    this.authToken = authToken;
    this.baseApiURL = 'https://orca-app.geothentic.com/api';
    this.apiEntryPoint = '';
  }

  handleError(error = null, ignoreError = false) {
    if (ignoreError) {
      return false;
    }

    let errorMessage = '';
    if (error.response) {
      errorMessage = `[${error.response.status}] ${error.response.data.detail}`;
    } else if (error.request) {
      errorMessage = error.request;
    } else {
      errorMessage = error.message;
    }

    if (error) {
      console.error(`[${this.name}]: ${errorMessage}`);
    }

    return true;
  }

  async makeCall(method, objID = null, extraParams = {}, payload = null, ignoreError = false) {
    let url = `${this.baseApiURL}${this.apiEntryPoint}`;

    if (objID) {
      url = `${url}${objID}/`;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers.Authorization = `Token ${this.authToken}`;
    }

    const config = {
      url: url,
      method: method,
      headers: headers,
      params: extraParams,
      data: payload,
      responseType: 'json',
    };

    // console.log('Call: ', config);

    const response = await axios(config)
    .then(result => result)
    .catch(error => this.handleError(error, ignoreError));

    if (Object.prototype.hasOwnProperty.call(response.data, 'results')) {
      return response.data.results;
    }

    return response.data;
  }

  async get(objID = null, extraParams = {}, payload = null, ignoreError = false) {
    return this.makeCall('get', objID, extraParams, payload, ignoreError);
  }

  async post(objID = null, extraParams = {}, payload = null, ignoreError = false) {
    return this.makeCall('post', objID, extraParams, payload, ignoreError);
  }

  async put(objID = null, extraParams = {}, payload = null, ignoreError = false) {
    return this.makeCall('put', objID, extraParams, payload, ignoreError);
  }

  async delete(objID = null, extraParams = {}, payload = null, ignoreError = false) {
    return this.makeCall('delete', objID, extraParams, payload, ignoreError);
  }

  async doLogin(email, password) {
    this.name = 'OrcaAPI/login/';
    this.apiEntryPoint = '/login/';
    const payload = {
      username: email,
      password: password,
    };
    const data = await this.post(null, null, payload);
    this.authToken = data.token;
    return this.authToken;
  }

  async getVehiclesLocations() {
    this.name = 'OrcaAPI/vehicles/locations/';
    this.apiEntryPoint = '/vehicles/locations/';
    return this.post();
  }

  async getVehicleStops(vehicleID) {
    this.name = 'OrcaAPI//vehicle/stops/';
    this.apiEntryPoint = `/vehicles/${vehicleID}/stops/`;
    return this.get();
  }
}
