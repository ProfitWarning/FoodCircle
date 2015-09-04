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
        .controller('LogoutCtrl', ['$auth', '$state', function ($auth, $state) {
            $auth.logout();
            $state.go('home');
        }]);
}());
