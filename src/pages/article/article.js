import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {ArticleService} from 'services/article-service';
import {CommentService} from 'services/comment-service';

@inject(SessionService, ArticleService, CommentService)
export class Article {
  newComment = '';

  constructor(sessionService, articleService, commentService) {
    this.sessionService = sessionService;
    this.articleService = articleService;
    this.commentService = commentService;
  }

  async activate(params) {
    this.slug = params.slug;

    try {
      this.article = await this.articleService.get(this.slug);
      this.comments = await this.commentService.getList(this.slug);
    } catch (_) {
    }
  }

  get canSave() {
    return this.newComment !== '';
  }

  async postComment() {
    this.errors = null;
    this.isRequesting = true;

    try {
      const comment = await this.commentService.add(this.slug, { body: this.newComment });
      this.comments.push(comment);
      this.newComment = '';

      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500)
    } catch (e) {
      this.errors = e.errors;
    }

    this.isRequesting = false;
  }

  async deleteComment(comment) {
    comment.isRequesting = true;
    await this.commentService.delete(this.slug, comment.id);
    this.comments = this.comments.filter(c => c.id !== comment.id);
  }
}
