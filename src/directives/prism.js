import angular from 'angular';
import Prism from 'prismjs';

export default (
    angular.module('css.prism', [])
      .directive('prism', function() {
        return {
          restrict: 'E',
          transclude: true,
          template: '<pre><code ng-transclude></code></pre>',
          link(scope, element, attributes) {
            // Add language class to code element
            element.find('code').addClass(`language-${attributes.language}`);

            // Highlight element code
            return element.ready(function() {
              return Prism.highlightElement(element[0]);
            });
          }
        };
      })
);
