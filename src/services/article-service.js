import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ArticleService {
  path = 'articles';

  constructor(apiService) {
    this.apiService = apiService;
  }

  async get(slug) {
    const response = await this.apiService.get(this._path(slug));
    return response.article;
  }

  async save(article) {
    const response = await this.apiService.post(this.path, { article });
    return response.article;
  }

  _path(id) {
    return `${this.path}/${id}`;
  }
}
