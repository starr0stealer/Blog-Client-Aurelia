const ELEMENTS = './elements';
const VALUE_CONVERTERS = './value-converters';

export function configure(config) {
  config.globalResources([
    // Elements
    `${ELEMENTS}/error-list.html`,

    // Value Converters
    `${VALUE_CONVERTERS}/keys`,
    `${VALUE_CONVERTERS}/proper-case`
  ]);
}
