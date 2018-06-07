import {inject, NewInstance} from 'aurelia-framework';
import {Router} from 'aurelia-router'
import {ValidationController, ValidationRules} from 'aurelia-validation';
import {ValidationRenderer} from 'resources/validation-renderer';
import {ArticleService} from 'services/article-service';

@inject(Router, NewInstance.of(ValidationController), ArticleService)
export class Editor {
  article = {
    title: '',
    description: '',
    body: ''
  };

  constructor(router, validationController, articleService) {
    this.router = router;
    this.validator = validationController;
    this.validator.addRenderer(new ValidationRenderer());
    this.articleService = articleService;

    ValidationRules
        .ensure('title').required()
        .ensure('body').required()
        .on(this.article);
  }

  get canSave() {
    return this.article.title !== '' && this.article.body !== '';
  }

  async submit() {
    this.errors = null;

    let result = await this.validator.validate();
    if (!result.valid) {
      return;
    }

    try {
      const article = await this.articleService.save(this.article);
      this.slug = article.slug;
      this.router.navigateToRoute('article', { slug: this.slug })
    } catch (e) {
      this.errors = e.errors;
    }
  }
}
