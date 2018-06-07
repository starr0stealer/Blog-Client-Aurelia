import {inject} from 'aurelia-framework';
import {ArticleService} from 'services/article-service';

@inject(ArticleService)
export class Article {
  constructor(articleService) {
    this.articleService = articleService;
  }

  async activate(params) {
    this.slug = params.slug;

    try {
      this.article = await this.articleService.get(this.slug);
    } catch (_) {
    }
  }
}
