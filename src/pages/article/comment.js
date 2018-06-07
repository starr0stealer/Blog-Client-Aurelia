import {inject, bindable, computedFrom} from 'aurelia-framework';
import {SessionService} from 'services/session-service';

@inject(SessionService)
export class CommentCustomElement {
  @bindable comment;
  @bindable onDelete;

  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  @computedFrom('sessionService.currentUser.username')
  get canModify() {
    if (!this.sessionService.currentUser) {
      return false;
    }

    return this.comment.author.username === this.sessionService.currentUser.username;
  }
}
