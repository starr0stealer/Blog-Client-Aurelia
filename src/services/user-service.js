import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class UserService {
  path = 'users';

  constructor(apiService) {
    this.apiService = apiService;
  }

  async get(username) {
    const response = await this.apiService.get(this._path(username));
    return response.user;
  }

  _path(id) {
    return `${this.path}/${id}`
  }
}
