/**
 * @ngdoc function
 * @name foodCircle.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('HeaderCtrl', ['$auth', 'jQuery', '$rootScope', function ($auth, $, $rootScope) {
        var vm = this, navbarBtn, profileBtn;
        vm.isAuthenticated = $auth.isAuthenticated;
        vm.recipeActive = false;

        navbarBtn = $('#js-navbar-collapse');
        profileBtn = $('#js-profile-collapse');

        navbarBtn.on('show.bs.collapse', function () {
            profileBtn.collapse('hide');
        });
        profileBtn.on('show.bs.collapse', function () {
            navbarBtn.collapse('hide');
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            vm.recipeActive = toState.name.indexOf('recipe.') > -1;
            vm.profileActive = toState.name.indexOf('myrecipes.') > -1;
        });
    }]);
}());
