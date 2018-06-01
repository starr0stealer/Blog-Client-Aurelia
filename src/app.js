export class App {
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
      }
    ]);
  }
}
