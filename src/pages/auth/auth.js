import {inject} from 'aurelia-framework';
import {Router, activationStrategy} from 'aurelia-router';
import {SessionService} from 'services/session-service';

@inject(Router, SessionService)
export class Authentication {
  user = {
    email: '',
    password: '',
    username: ''
  };

  constructor(router, sessionService) {
    this.router = router;
    this.sessionService = sessionService;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  activate(params, routeConfig) {
    this.type = routeConfig.name;
  }

  get canSave() {
    return this.user.email !== '' && this.user.password !== ''
        && (this.type === 'register' ? this.user.username !== '' : true);
  }

  async submit() {
    this.errors = null;

    try {
      await this.sessionService[this.type](this.user);
      this.router.navigateToRoute('home');
    } catch (e) {
      this.errors = e.errors;
    }
  }
}
