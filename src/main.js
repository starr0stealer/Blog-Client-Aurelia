import 'bootstrap';
import environment from 'environment';
import {HttpClient} from 'aurelia-fetch-client';
import {ApiInterceptor} from 'services/api-interceptor';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  aurelia.container.get(HttpClient).configure(config => {
    config
        .withBaseUrl(environment.apiUrl)
        .withInterceptor(aurelia.container.get(ApiInterceptor))
        .withDefaults({
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
  });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
