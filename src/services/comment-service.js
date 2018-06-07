import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';
import {ArticleService} from './article-service';

@inject(ApiService, ArticleService)
export class CommentService {
  path = 'comments';

  constructor(apiService, articleService) {
    this.apiService = apiService;
    this.articleService = articleService;
  }

  async getList(slug) {
    const response = await this.apiService.get(this._path(slug));
    return response.comments;
  }

  async add(slug, comment) {
    const response = await this.apiService.post(this._path(slug), { comment });
    return response.comment;
  }

  delete(slug, id) {
    return this.apiService.delete(`${this._path(slug)}/${id}`);
  }

  _path(slug) {
    return `${this.articleService._path(slug)}/${this.path}`;
  }
}
