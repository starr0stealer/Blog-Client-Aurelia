import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class ApiService {
  constructor(http) {
    this.http = http;
  }

  post(path, body) {
    return this._push(path, body);
  }

  _push(path, body, asPut = false) {
    const options = {
      method: asPut ? 'PUT' : 'POST',
      body: json(body)
    };

    return this._request(path, options);
  }

  async _request(path, options) {
    const result = await this.http.fetch(path, options);
    const status = result.status;
    const response = await result.json();

    if (status >= 200 && status < 400) {
      return response;
    }

    throw new Error();
  }
}
