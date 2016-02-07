import home from './views/home.html';
import selectors from './views/selectors.html';

/**
 * @ngInject
 */
module.exports = function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      template: home
    })
    .state('selectors', {
      url: '/selectors',
      template: selectors
    });
    //.when('/', {
    //  templateUrl: 'home.html'
    //})
    //.when('/flexbox', {
    //  templateUrl: 'flexbox.html'
    //})
    //.when('/selectors', {
    //  templateUrl: 'selectors.html'
    //})
    //.when('/transform', {
    //  templateUrl: 'transform.html',
    //  controller: 'TransformController as TransformCtrl'
    //})
    //.when('/transition', {
    //  templateUrl: 'transition.html'
    //})
    //.when('/keyframes', {
    //  templateUrl: 'keyframes.html'
    //})
    //.when('/filter', {
    //  templateUrl: 'filter.html'
    //})
    //.when('/methodology', {
    //  templateUrl: 'methodology.html'
    //})
    //.when('/specificity', {
    //  templateUrl: 'specificity.html'
    //})
    //.when('/media-queries', {
    //  templateUrl: 'media-queries.html'
    //})
  $urlRouterProvider.otherwise('/');
};
