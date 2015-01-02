'use strict';

/**
 * @ngInject
 */
module.exports = function($locationProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'home.html'
    })
    .when('/flexbox', {
      templateUrl: 'flexbox.html'
    })
    .when('/selectors', {
      templateUrl: 'selectors.html'
    })
    .when('/transform', {
      templateUrl: 'transform.html'
    })
    .when('/transition', {
      templateUrl: 'transition.html'
    })
    .when('/keyframes', {
      templateUrl: 'keyframes.html'
    })
    .when('/filter', {
      templateUrl: 'filter.html'
    })
    .when('/methodology', {
      templateUrl: 'methodology.html'
    })
    .when('/specificity', {
      templateUrl: 'specificity.html'
    })
    .otherwise({
      redirectTo: '/'
    });

};
