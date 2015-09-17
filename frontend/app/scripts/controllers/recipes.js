/**
 * @ngdoc function
 * @name foodCircle.controller:RecipesCtrl
 * @description
 * # RecipesCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipesCtrl', ['recipeService', 'recipes', function (recipeService, recipes) {
        var vm = this;
        vm.recipeList = recipes;
    }]);
}());