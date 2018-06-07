import {inject, computedFrom, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SessionService} from 'services/session-service';
import {ArticleService} from 'services/article-service';

@inject(Router, SessionService, ArticleService)
export class ArticleMeta {
  @bindable article;

  constructor(router, sessionService, articleService) {
    this.router = router;
    this.sessionService = sessionService;
    this.articleService = articleService;
  }

  @computedFrom('sessionService.currentUser.username')
  get canModify() {
    if (!this.sessionService.currentUser) {
      return false;
    }

    return this.article.author.username === this.sessionService.currentUser.username;
  }

  async deleteArticle() {
    await this.articleService.delete(this.article.slug);
    this.router.navigateToRoute('home');
  }
}
