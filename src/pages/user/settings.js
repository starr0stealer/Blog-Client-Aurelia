import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {ValidationRenderer} from 'resources/validation-renderer';
import {SessionService} from 'services/session-service';
import {UserService} from 'services/user-service';

@inject(Router, NewInstance.of(ValidationController), SessionService, UserService)
export class Settings {
  @bindable imageType = 'image';
  profile = {};
  lastImage = null;
  lastUrl = null;

  constructor(router, validationController, sessionService, userService) {
    this.router = router;
    this.validator = validationController;
    this.validator.addRenderer(new ValidationRenderer());
    this.sessionService = sessionService;
    this.userService = userService;

    Object.assign(this.profile, this.sessionService.currentUser);
    this.imageType = this.profile.image
        && !this.profile.image.includes('data:image') ? 'url' : 'image';

    ValidationRules
        .ensure('email').required().email()
        .ensure('password').minLength(8)
        .ensure('username').required()
        .on(this.profile);
  }

  imageSelected(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => this.profile.image = reader.result;
  }

  imageTypeChanged() {
    if (this.imageType === 'image') {
      this.lastImage = this.profile.image;
      this.profile.image = this.lastUrl;
    } else {
      this.lastUrl = this.profile.image;
      this.profile.image = this.lastImage;
    }
  }

  get canSave() {
    return this.profile.email !== ''
        && this.profile.username !== '';
  }

  async update() {
    this.errors = null;

    const result = await this.validator.validate();
    if (!result.valid) {
      return;
    }

    if (this.profile.password === '') {
      delete this.profile.password;
    }

    try {
      const name = (await this.userService.update(this.profile)).username;
      this.router.navigateToRoute('profile', { name });
    } catch (e) {
      this.errors = e.errors;
    }
  }
}
