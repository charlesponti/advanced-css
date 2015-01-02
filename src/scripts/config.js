'use strict';

/**
 * @ngInject
 */
module.exports = function($locationProvider, $routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/flexbox', {
      templateUrl: 'views/flexbox.html'
    })
    .when('/selectors', {
      templateUrl: 'views/selectors.html'
    })
    .when('/transform', {
      templateUrl: 'views/transform.html'
    })
    .when('/transition', {
      templateUrl: 'views/transition.html'
    })
    .when('/keyframes', {
      templateUrl: 'views/keyframes.html'
    })
    .when('/filter', {
      templateUrl: 'views/filter.html'
    })
    .when('/methodology', {
      templateUrl: 'views/methodology.html'
    })
    .otherwise({
      redirectTo: '/'
    });

};
