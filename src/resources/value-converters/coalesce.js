export class CoalesceValueConverter {
  toView(value, placeholder) {
    return value || placeholder;
  }
}
