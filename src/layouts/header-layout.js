import {bindable, bindingMode} from 'aurelia-framework';

export class HeaderLayoutCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) routerConfig;

  routerConfigChanged(newValue) {
    this.activeRoute = newValue.name;
  }
}
