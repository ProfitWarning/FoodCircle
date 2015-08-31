/**
 * @ngdoc function
 * @name foodCircle.controller:HeaderctrlCtrl
 * @description
 * # HeaderCtrl
 * Controller of the foodCircle
 */
'use strict';
angular.module('foodCircle').controller('HeaderCtrl', ['$auth', function ($auth) {
    var vm = this;
    vm.isAuthenticated = $auth.isAuthenticated;
}]);
