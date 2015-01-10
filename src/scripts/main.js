'use strict';

window.$ =
window.jQuery = require('jquery');

var angular = require('angular');

// Require angular dependencies
require('angular-route');

// Require templates
require('./templates');

// Require Transform application
require('./transform');

// Load application when document is ready
angular.element(document).ready(function() {
  var requires = [
    'ngRoute',
    'templates',
    'advanced-css.transform'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  // Configure application
  angular.module('app').config(require('./config'));

  angular.module('app')
    .directive('listGroup', require('./directives/list-group'))
    .directive('listItem', require('./directives/list-item'))
    .directive('prism', require('./directives/prism'));

  // Bootstrap application
  angular.bootstrap(document, ['app']);
});
