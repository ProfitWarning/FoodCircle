/**
 * @ngdoc function
 * @name foodCircle.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle')
        .controller('LogoutCtrl', ['$auth', '$state', 'localStorageService', function ($auth, $state, localStorageService) {
            $auth.logout();
            localStorageService.remove('currentUser');
            $state.go('main.home');
        }]);
}());
