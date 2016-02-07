import angular from 'angular';
import uirouter from 'angular-ui-router';
import template from './home.html';

export default (
    angular
        .module('css.home', [uirouter])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('home', {
                url: '/',
                template
            });
        }])
)