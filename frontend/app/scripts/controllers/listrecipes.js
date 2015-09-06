/**
 * @ngdoc function
 * @name foodCircle.controller:ListrecipesCtrl
 * @description
 * # ListrecipesCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('ListRecipesCtrl', ['recipeService', function (recipeService) {
        var vm = this;
        vm.recipeList = recipeService.getFullRecipeList();
    }]);
}());
