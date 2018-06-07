import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';

@inject(SessionService)
export class App {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Blog App';
    config.options.pushState = true;
    config.map([
      // Home
      {
        route: ['', 'home'],
        moduleId: 'pages/home/home',
        name: 'home',
        title: 'Home'
      },
      // Sign in
      {
        route: ['login'],
        moduleId: 'pages/auth/auth',
        name: 'login',
        title: 'Sign in'
      },
      // Sign up
      {
        route: ['register'],
        moduleId: 'pages/auth/auth',
        name: 'register',
        title: 'Sign up'
      },
      // Profile
      {
        route: ['@/:name'],
        moduleId: 'pages/user/profile',
        name: 'profile',
        title: 'Profile'
      },
      // Settings
      {
        route: ['settings'],
        moduleId: 'pages/user/settings',
        name: 'settings',
        title: 'Settings'
      },
      // Editor
      {
        route: ['editor/:slug?'],
        moduleId: 'pages/article/editor',
        name: 'editor',
        title: 'Editor'
      },
      // Article
      {
        route: ['article/:slug'],
        moduleId: 'pages/article/article',
        name:'article',
        title: 'Article'
      }
    ]);
  }

  async activate() {
    await this.sessionService.getUser();
  }
}
