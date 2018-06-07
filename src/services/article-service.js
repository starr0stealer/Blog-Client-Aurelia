import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ArticleService {
  path = 'articles';

  constructor(apiService) {
    this.apiService = apiService;
  }

  getList(params) {
    return this.apiService.get(this.path, params);
  }

  async get(slug) {
    const response = await this.apiService.get(this._path(slug));
    return response.article;
  }

  async save(article) {
    let action = 'post';
    let path = this.path;

    if (article.slug) {
      action = 'put';
      path = this._path(article.slug);
    }

    const response = await this.apiService[action](path, { article });
    return response.article;
  }

  delete(slug) {
    return this.apiService.delete(this._path(slug));
  }

  _path(id) {
    return `${this.path}/${id}`;
  }
}
