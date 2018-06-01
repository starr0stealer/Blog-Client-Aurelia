import {inject} from 'aurelia-framework';
import {UserService} from 'services/user-service';

@inject(UserService)
export class Profile {
  constructor(userService) {
    this.userService = userService;
  }

  async activate(params) {
    try {
      this.profile = await this.userService.get(params.name)
    } catch (_) {
      this.router.navigateToRoute('home');
    }
  }
}
