import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'prismjs/themes/prism-coy.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import prism from './directives/prism';
import flexbox from './flexbox';
import home from './home';
import transform from './transform';

// Load application when document is ready
angular.element(document).ready(function() {

  // mount on window for testing
  angular
      .module('advancedCSS', [
        'ui.router',
        flexbox.name,
        home.name,
        transform.name,
          prism.name
      ])
      .config(['$urlRouterProvider', function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
      }])
      .directive('listGroup', require('./directives/list-group'))
      .directive('listItem', require('./directives/list-item'));

  // Bootstrap application
  angular.bootstrap(document, ['advancedCSS']);
});
