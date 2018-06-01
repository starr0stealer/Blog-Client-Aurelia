import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

const TOKEN_KEY = 'jwt_token';

@inject(ApiService)
export class SessionService {
  isAuthenticated = false;
  currentUser = null;

  constructor(apiService) {
    this.apiService = apiService;
  }

  register(data) {
    return this._apiRequest('register', data);
  }

  login(data) {
    return this._apiRequest('login', data);
  }

  async logout() {
    await this.apiService.delete('logout');
    this.destroyToken();
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  async getUser() {
    if (!this.getToken()) {
      this.currentUser = null;
      this.isAuthenticated = false;
      return;
    }

    try {
      const response = await this.apiService.get('users/current');
      this.currentUser = response.user;
      this.isAuthenticated = true;
    } catch (_) {
      this.destroyToken();
      this.currentUser = null;
      this.isAuthenticated = false;
    }
  }

  async _apiRequest(path, user) {
    let response = await this.apiService.post(path, { user });
    this.saveToken(response.token);
    this.currentUser = response.user;
    this.isAuthenticated = true;
  }

  saveToken(token) {
    window.localStorage[TOKEN_KEY] = token;
  }

  getToken() {
    return window.localStorage[TOKEN_KEY];
  }

  destroyToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  isTokenValid() {
    const token = this.getToken();
    return token && token !== '';
  }

  getAuthorizationHeader() {
    if (this.isTokenValid()) {
      return `Bearer ${this.getToken()}`;
    }
  };
}
