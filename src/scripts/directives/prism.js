'use strict';

var Prism = window.Prism;
var angular = require('angular');

module.exports = function() {
  return {
    restrict: 'EA',
    link: function(scope, element, attributes) {
      return element.ready(function() {
        return Prism.highlightElement(element[0]);
      });
    }
  };
};
