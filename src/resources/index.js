const ELEMENTS = './elements';
const VALUE_CONVERTERS = './value-converters';

export function configure(config) {
  config.globalResources([
    // Elements
    `${ELEMENTS}/article-list.html`,
    `${ELEMENTS}/error-list.html`,
    `${ELEMENTS}/favorite-button`,
    `${ELEMENTS}/follow-button`,
    `${ELEMENTS}/profile-image.html`,

    // Value Converters
    `${VALUE_CONVERTERS}/coalesce`,
    `${VALUE_CONVERTERS}/date`,
    `${VALUE_CONVERTERS}/format-html`,
    `${VALUE_CONVERTERS}/keys`,
    `${VALUE_CONVERTERS}/proper-case`
  ]);
}
