/**
 * @ngdoc function
 * @name foodCircle.controller:ErrorpageCtrl
 * @description
 * # ErrorpageCtrl
 * Controller of the foodCircle
 */

/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('ErrorpageCtrl', ['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        var vm = this;

        vm.errorMessage = $stateParams.error.message;
        vm.reason = $stateParams.reason;
        vm.toPrevious = function () {
            if (!$rootScope.previousState || $rootScope.previousState === '') {
                $rootScope.previousState = 'main.home';
            }
            $state.go($rootScope.previousState, $rootScope.previousStateParams);
        };
    }]);
}());
