/**
 * @ngdoc function
 * @name foodCircle.controller:RecipeDetailCtrl
 * @description
 * # RecipeDetailCtrl
 * Controller of the foodCircle
 */

(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeDetailCtrl', ['recipeService', 'recipeDetail', function (recipeService, recipeDetail) {
        var vm = this;
        vm.recipe = recipeDetail;
        console.log(recipeDetail);
    }]);
}());
