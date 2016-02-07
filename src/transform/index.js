import transformer from './transformer';
import template from './transform.html';
import './transform.less';

export default (
    angular.module('css.transform', [])
        .directive('transformer', transformer)
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('transform', {
                url: '/transform',
                template
            });
        }])
);
