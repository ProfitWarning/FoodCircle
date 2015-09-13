/**
 * @ngdoc service
 * @name foodCircle.toolsService
 * @description
 * # toolsService
 * Service in the foodCircle.
 */
(function () {
    'use strict';

    angular.module('foodCircle').service('toolsService', [function () {
        var toolsService = {}, removeSelectedRecipe;
        toolsService.selectedRecipes = [];

        /*jslint plusplus: true */
        toolsService.removeSelectedRecipe = function (recipeId) {
            var i, recipe;
            for (i = 0; i < toolsService.selectedRecipes.length; i++) {
                recipe = toolsService.selectedRecipes[i];
                if (recipe.id === recipeId) {
                    toolsService.selectedRecipes.splice(i, 1);
                    break;
                }
            }
        };

        return toolsService;
    }]);
}());
