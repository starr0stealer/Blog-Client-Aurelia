import {inject} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import {ArticleService} from 'services/article-service';

@inject(ArticleService)
export class ProfileArticles {
  articles = [];
  pageNumber;
  totalPages;
  currentPage = 1;
  limit = 10;

  constructor(articleService) {
    this.articleService = articleService;
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  async activate(params, routeConfig) {
    this.username = params.name;
    this.type = routeConfig.name;

    await this.getArticles();
  }

  async getArticles() {
    const params = {
      limit: this.limit,
      offset: this.limit * (this.currentPage - 1)
    };

    params[this.type === 'user-articles' ? 'author' : 'favorited'] = this.username;

    try {
      const response = await this.articleService.getList('all', params);
      this.articles = response.articles;
      this.totalPages = Array.from(new Array(Math.ceil(response.articlesCount / this.limit)), (val, index) => index + 1);

      window.scrollTo(0, 0);
    } catch (_) {
    }
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.getArticles();
  }
}
