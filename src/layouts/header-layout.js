import {inject, bindable, bindingMode} from 'aurelia-framework';
import {SessionService} from 'services/session-service';

@inject(SessionService)
export class HeaderLayoutCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) routerConfig;

  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  routerConfigChanged(newValue) {
    this.activeRoute = newValue.name;
  }
}
