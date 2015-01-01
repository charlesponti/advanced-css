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
    .when('/keyframes', {
      templateUrl: 'views/keyframes.html'
    })
    .when('/animations', {
      templateUrl: 'views/animations.html'
    })
    .otherwise({
      redirectTo: '/'
    });

};
