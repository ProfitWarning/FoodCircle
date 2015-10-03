/**
 * @ngdoc function
 * @name foodCircle.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('HeaderCtrl', ['$auth', 'jQuery', '$rootScope', '$state', function ($auth, $, $rootScope, $state) {
        var vm = this, navbarBtn, profileBtn;
        vm.isAuthenticated = $auth.isAuthenticated;
        vm.recipeActive = false;

        var setMenuItemActive = function (stateName) {
            vm.recipeActive = stateName.indexOf('recipe.') > -1;
            vm.profileActive = stateName.indexOf('myrecipes.') > -1;
        };

        setMenuItemActive($state.current.name);

        navbarBtn = $('#js-navbar-collapse');
        profileBtn = $('#js-profile-collapse');

        navbarBtn.on('show.bs.collapse', function () {
            profileBtn.collapse('hide');
        });
        profileBtn.on('show.bs.collapse', function () {
            navbarBtn.collapse('hide');
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            setMenuItemActive(toState.name);
        });
    }]);
}());
