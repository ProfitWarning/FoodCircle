/**
 * @ngdoc function
 * @name foodCircle.controller:MyrecipesCtrl
 * @description
 * # MyrecipesCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'authService', function (recipeService, authService) {
        var vm = this;
        vm.recipeList = recipeService.getFullRecipeList(/*authService.currentUser()*/);
    }]);
}());
