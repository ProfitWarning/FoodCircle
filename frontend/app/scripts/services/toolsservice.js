/**
 * @ngdoc service
 * @name foodCircle.toolsService
 * @description
 * # toolsService
 * Service in the foodCircle.
 */
(function () {
    'use strict';

    angular.module('foodCircle').service('toolsService', ['jQuery', '$timeout', function ($, $timeout) {
        var toolsService = {}, removeSelectedRecipe,
            alertTimeout;
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

        toolsService.pulseRecipe = function (recipeid) {
            $('#recipe_' + recipeid).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated pulse');
            });
        };

        toolsService.scale3dRecipe = function (recipeid) {
            $('#recipe_' + recipeid).addClass('toScale');
        };

        toolsService.removeVisuals = function (recipeid) {
            $('#recipe_' + recipeid).removeClass('toScale');
        };

        return toolsService;
    }]);
}());
