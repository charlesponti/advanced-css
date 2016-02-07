import angular from 'angular';
import uirouter from 'angular-ui-router';

// Require Transform module
require('./transform');

// Load application when document is ready
angular.element(document).ready(function() {

  // mount on window for testing
  window.app = angular.module('advancedCSS', [
    'ngRoute',
    'advancedCSS.templates',
    'advancedCSS.transform'
  ]);

  // Configure application
  angular.module('advancedCSS').config(require('./config'));

  angular.module('advancedCSS')
    .directive('listGroup', require('./directives/list-group'))
    .directive('listItem', require('./directives/list-item'))
    .directive('prism', require('./directives/prism'));

  // Bootstrap application
  angular.bootstrap(document, ['advancedCSS']);
});
