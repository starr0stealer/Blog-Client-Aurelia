import {inject, computedFrom} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import {SessionService} from 'services/session-service';
import {UserService} from 'services/user-service';

@inject(SessionService, UserService)
export class Profile {
  constructor(sessionService, userService) {
    this.sessionService = sessionService;
    this.userService = userService;
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      // User Articles
      {
        route: [''],
        moduleId: 'pages/user/articles',
        name: 'user-articles'
      },
      // Favorite Articles
      {
        route: ['favorites'],
        moduleId: 'pages/user/articles',
        name: 'favorite-articles'
      }
    ]);
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  async activate(params) {
    try {
      this.profile = await this.userService.get(params.name)
    } catch (_) {
      this.router.navigateToRoute('home');
    }
  }

  @computedFrom('router.currentInstruction.config.name')
  get activeRoute() {
    return this.router.currentInstruction.config.name;
  }

  @computedFrom('sessionService.currentUser.username')
  get isUser() {
    if (!this.sessionService.currentUser) {
      return false;
    }

    return this.profile.username === this.sessionService.currentUser.username;
  }
}
