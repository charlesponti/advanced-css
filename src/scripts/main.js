'use strict';

window.$ =
window.jQuery = require('jquery');

var angular = require('angular');

angular.module('advancedCSS',[])
  .config(require('./config'));
