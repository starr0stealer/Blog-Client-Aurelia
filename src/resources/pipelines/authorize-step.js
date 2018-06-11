import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {SessionService} from 'services/session-service';

@inject(SessionService)
export class AuthorizeStep {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  run(navigationInstruction, next) {
    const requiresAuth = navigationInstruction.getAllInstructions().some(i => i.config.settings.auth);
    const isLoggedIn = this.sessionService.isAuthenticated;
    if (requiresAuth && !isLoggedIn) {
      return next.cancel(new Redirect('login'));
    }

    return next();
  }
}
