'use strict';

/**
 * @ngInject
 */
module.exports = function() {

  return {

    restrict: 'E',

    scope: true,

    transclude: false,

    template: '<div class="outerbox"><div class="innerbox"></div></div>',

    controller: function() {

    }

  };

};
