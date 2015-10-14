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

    angular.module('foodCircle').controller('ProfileCtrl', ['$log', '$state', function ($log, $state) {
        var vm = this;
        vm.eventListQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};

        vm.onEventItemClick = function (event) {
            $state.go('main.event.edit', {id: event.id});
        };

        vm.onRecipeItemClick = function (recipe) {
            $state.go('main.myrecipes.edit', {name: recipe.name});
        };
    }]);
}());
