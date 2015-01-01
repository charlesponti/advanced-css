'use strict';

window.$ =
window.jQuery = require('jquery');

var angular = require('angular');

// Require angular dependencies
require('angular-route');

// Define main application
angular.module('advancedCSS',[
    'ngRoute'
  ])
  .config(require('./config'));

// Bootstrap application
angular.bootstrap(document, ['advancedCSS']);
