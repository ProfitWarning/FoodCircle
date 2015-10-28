/**
 * @ngdoc function
 * @name foodCircle.controller:RecipeDetailCtrl
 * @description
 * # RecipeDetailCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipeDetailCtrl', ['recipeService', 'recipeDetail', 'API_URL', function (recipeService, recipeDetail, API_URL) {
        var vm = this;
        vm.recipe = recipeDetail;
        vm.API_URL = API_URL;
    }]);
}());
