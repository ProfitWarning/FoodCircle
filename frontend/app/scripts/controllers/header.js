/**
 * @ngdoc function
 * @name foodCircle.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('HeaderCtrl', ['$auth', 'jQuery', function ($auth, $) {
        var vm = this, navbarBtn, profileBtn;
        vm.isAuthenticated = $auth.isAuthenticated;

        navbarBtn = $('#js-navbar-collapse');
        profileBtn = $('#js-profile-collapse');

        navbarBtn.on('show.bs.collapse', function () {
            profileBtn.collapse('hide');
        });
        profileBtn.on('show.bs.collapse', function () {
            navbarBtn.collapse('hide');
        });
    }]);
}());
