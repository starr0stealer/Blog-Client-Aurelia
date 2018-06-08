import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {ArticleService} from 'services/article-service';

@inject(SessionService, ArticleService)
export class Home {
  shownList = 'all';
  articles = [];
  pageNumber;
  totalPages;
  currentPage = 1;
  limit = 10;

  constructor(sessionService, articleService) {
    this.sessionService = sessionService;
    this.articleService = articleService;
  }

  async activate() {
    await this.getArticles();
  }

  async getArticles() {
    const params = {
      limit: this.limit,
      offset: this.limit * (this.currentPage - 1)
    };

    try {
      const response = await this.articleService.getList(this.shownList, params);
      this.articles = response.articles;
      this.totalPages = Array.from(new Array(Math.ceil(response.articlesCount / this.limit)), (val, index) => index + 1);

      window.scrollTo(0, 0);
    } catch (_) {
    }
  }

  async setListTo(type, tag) {
    if (type === 'feed' && !this.sessionService.isAuthenticated) {
      return;
    }

    if (type !== this.shownList) {
      this.currentPage = 1;
    }

    this.shownList = type;
    await this.getArticles();
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.getArticles();
  }
}
