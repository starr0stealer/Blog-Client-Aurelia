import {inject, NewInstance} from 'aurelia-framework';
import {Router, activationStrategy} from 'aurelia-router';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {ValidationRenderer} from 'resources/validation-renderer';
import {SessionService} from 'services/session-service';

@inject(Router, NewInstance.of(ValidationController), SessionService)
export class Authentication {
  user = {
    email: '',
    password: '',
    username: ''
  };

  constructor(router, validationController, sessionService) {
    this.router = router;
    this.validator = validationController;
    this.validator.addRenderer(new ValidationRenderer());
    this.sessionService = sessionService;

    ValidationRules
        .ensure('email').required().email()
        .ensure('password').required().minLength(8)
        .ensure('username').required().when(() => this.type === 'register')
        .on(this.user);
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

    const result = await this.validator.validate();
    if (!result.valid) {
      return;
    }

    this.isRequesting = true;

    try {
      await this.sessionService[this.type](this.user);
      this.router.navigateToRoute('home');
    } catch (e) {
      this.errors = e.errors;
    }

    this.isRequesting = false;
  }
}
