import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SessionService} from 'services/session-service';
import {UserService} from 'services/user-service';

@inject(Router, SessionService, UserService)
export class FollowButtonCustomElement {
  @bindable user;

  constructor(router, sessionService, userService) {
    this.router = router;
    this.sessionService = sessionService;
    this.userService = userService;
  }

  toggleFollow() {
    if (!this.sessionService.isAuthenticated) {
      this.router.navigateToRoute('login');
      return;
    }

    this.user.following = !this.user.following;
    const action = this.user.following ? 'follow' : 'unfollow';
    this.userService[action](this.user.username);
  }
}
