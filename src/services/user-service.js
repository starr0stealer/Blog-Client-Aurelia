import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';
import {SessionService} from './session-service';

@inject(ApiService, SessionService)
export class UserService {
  path = 'users';

  constructor(apiService, sessionService) {
    this.apiService = apiService;
    this.sessionService = sessionService;
  }

  async get(username) {
    const response = await this.apiService.get(this._path(username));
    return response.user;
  }

  async update(user) {
    const response = await this.apiService.put(this._path(user.id), { user });
    return this.sessionService.currentUser = response.user;
  }

  follow(username) {
    return this.apiService.post(`${this._path(username)}/follow`);
  }

  unfollow(username) {
    return this.apiService.delete(`${this._path(username)}/follow`);
  }

  _path(id) {
    return `${this.path}/${id}`
  }
}
