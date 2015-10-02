/**
 * @ngdoc function
 * @name foodCircle.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('HomeCtrl', ['recipeService', 'recipeList', function (recipeService, recipeList) {
        var vm = this;
        vm.recipeList = recipeList;
    }]);
}());
