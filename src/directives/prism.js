'use strict';

var Prism = window.Prism;
var angular = require('angular');

module.exports = function() {
  return {
    restrict: 'E',

    transclude: true,

    template: "<pre><code ng-transclude></code></pre>",

    link: function(scope, element, attributes) {
      // Add language class to code element
      element.find('code').addClass('language-'+attributes.language);

      // Highlight element code
      return element.ready(function() {
        return Prism.highlightElement(element[0]);
      });
    }
  };
};
