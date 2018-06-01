import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SessionService} from 'services/session-service';

@inject(Router, SessionService)
export class HeaderLayoutCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) routerConfig;

  constructor(router, sessionService) {
    this.router = router;
    this.sessionService = sessionService;
  }

  routerConfigChanged(newValue) {
    this.activeRoute = newValue.name;
  }

  async logout() {
    await this.sessionService.logout();
    this.router.navigateToRoute('home');
  }
}
