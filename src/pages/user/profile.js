import {inject, computedFrom} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {UserService} from 'services/user-service';

@inject(SessionService, UserService)
export class Profile {
  constructor(sessionService, userService) {
    this.sessionService = sessionService;
    this.userService = userService;
  }

  async activate(params) {
    try {
      this.profile = await this.userService.get(params.name)
    } catch (_) {
      this.router.navigateToRoute('home');
    }
  }

  @computedFrom('sessionService.currentUser.username')
  get isUser() {
    if (!this.sessionService.currentUser) {
      return false;
    }

    return this.profile.username === this.sessionService.currentUser.username;
  }
}
