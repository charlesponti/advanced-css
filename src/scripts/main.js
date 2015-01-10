'use strict';

window.$ =
window.jQuery = require('jquery');

var angular = require('angular');

// Require angular dependencies
require('angular-route');

// Require templates
require('./templates');

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
