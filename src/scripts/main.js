'use strict';

window.$ =
window.jQuery = require('jquery');

var angular = require('angular');

// Require angular dependencies
require('angular-route');

// Require templates
require('./templates');

// Load application when document is ready
angular.element(document).ready(function() {
  var requires = [
    'ngRoute',
    'templates',
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  // Configure application
  angular.module('app').config(require('./config'));

  // Bootstrap application
  angular.bootstrap(document, ['app']);
});
