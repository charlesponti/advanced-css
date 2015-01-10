'use strict';

angular.module('advanced-css.transform', [])
  .directive('transformer', require('./directives/transformer'))
  .controller('TransformCtrl', TransformCtrl);

/**
 * @ngInject
 */
function TransformCtrl($scope) {

}
