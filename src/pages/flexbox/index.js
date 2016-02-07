import angular from 'angular';
import uirouter from 'angular-ui-router';
import template from './flexbox.html';
import './flexbox.less';

export default (
    angular
        .module('css.flexbox', [uirouter])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('flexbox', {
                url: '/flexbox',
                template,
                controllerAs: 'flexbox',
                controller: ['$element', function($element) {
                    this.onColumnClick = function() {
                        $element.find('.flexbox').css({
                            '-webkit-flex-flow': 'column wrap',
                            'flex-direction': 'column'
                        });
                    };

                    this.onRowClick = function() {
                        $element.find('.flexbox').css({'flex-direction': 'row'});
                    };
                }]
            })
        }])
);