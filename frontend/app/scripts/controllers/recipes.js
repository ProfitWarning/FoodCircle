/**
 * @ngdoc function
 * @name foodCircle.controller:RecipesCtrl
 * @description
 * # RecipesCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipesCtrl', ['recipeService', 'recipes', 'API_URL', function (recipeService, recipes, API_URL) {
        var vm = this;
        vm.API_URL = API_URL;
        vm.recipeList = recipes;
    }]);
}());
