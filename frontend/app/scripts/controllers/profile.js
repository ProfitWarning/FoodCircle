/**
 * @ngdoc function
 * @name foodCircle.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('ProfileCtrl', ['$log', '$state', 'authService', function ($log, $state, authService) {
        var vm = this;
        vm.eventListQuery = {where: {eventowner: authService.currentUser().id}, sort: 'updatedAt DESC'};
        vm.eventOwnerId = authService.currentUser().id;

        vm.onEventItemClick = function (event) {
            $state.go('main.event.edit', {id: event.id});
        };

        vm.onRecipeItemClick = function (recipe) {
            $state.go('main.myrecipes.edit', {name: recipe.name});
        };
    }]);
}());
