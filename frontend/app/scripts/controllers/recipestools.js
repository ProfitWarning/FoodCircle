/**
 * @ngdoc function
 * @name foodCircle.controller:RecipestoolsCtrl
 * @description
 * # RecipestoolsCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipesToolsCtrl', [function ($) {
        var vm = this;
        vm.listActive = false;

        vm.onListViewClick = function (event) {
            event.preventDefault();
            $('#recipes .item').addClass('list-group-item');
            vm.listActive = true;
        };

        vm.onGridViewClick = function (event) {
            event.preventDefault();
            $('#recipes .item').removeClass('list-group-item');
            $('#recipes .item').addClass('grid-group-item');
            vm.listActive = false;
        };

    }]);
}());
