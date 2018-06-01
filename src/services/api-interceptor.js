import {inject} from 'aurelia-framework';
import {SessionService} from './session-service';

const AUTHORIZATION_HEADER = 'Authorization';

@inject(SessionService)
export class ApiInterceptor {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  request(request) {
    if (!this.sessionService.isTokenValid()) {
      return request;
    }

    if (!request.headers.get(AUTHORIZATION_HEADER)) {
      request.headers.append(AUTHORIZATION_HEADER, this.sessionService.getAuthorizationHeader());
    }

    return request;
  };
}
