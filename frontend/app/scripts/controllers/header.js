/**
 * @ngdoc function
 * @name foodCircle.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('HeaderCtrl', ['$auth', function ($auth) {
        var vm = this;
        vm.isAuthenticated = $auth.isAuthenticated;
    }]);
}());
