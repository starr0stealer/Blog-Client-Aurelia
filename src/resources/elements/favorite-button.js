import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {SessionService} from 'services/session-service';
import {ArticleService} from 'services/article-service';

@inject(Router, SessionService, ArticleService)
export class FavoriteButtonCustomElement {
  @bindable article;
  @bindable includeLabel = true;

  constructor(router, sessionService, articleService) {
    this.router = router;
    this.sessionService = sessionService;
    this.articleService = articleService;
  }

  toggleFavorite() {
    if (!this.sessionService.isAuthenticated) {
      this.router.navigateToRoute('login');
      return;
    }

    this.article.favorited = !this.article.favorited;
    const action = this.article.favorited ? 'favorite' : 'unfavorite';
    this.articleService[action](this.article.slug);

    if (this.article.favorited ) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }
}
