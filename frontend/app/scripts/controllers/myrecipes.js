/**
 * @ngdoc function
 * @name foodCircle.controller:MyrecipesCtrl
 * @description
 * # MyrecipesCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'toolsService', '$scope', '$filter', 'recipes', 'API_URL', function (recipeService, toolsService, $scope, $filter, recipes, API_URL) {

        var vm = this,
            removeRecipe = function (recipeid) {
                var found = $filter('filter')(vm.recipeList, {id: recipeid}, false),
                    pos;
                if (found && found.length > 0) {
                    pos = vm.recipeList.map(function (e) {return e.id; }).indexOf(found[0].id);
                    vm.recipeList.splice(pos, 1);
                }
            };

        vm.selectedRecipes = [];
        vm.recipeList = recipes;
        vm.showEditBtn = true;
        vm.API_URL = API_URL;

        vm.onSelectRecipe = function (recipe) {
            if (!recipe.selected) {
                toolsService.selectedRecipes.push(recipe);
                recipe.selected = true;
                toolsService.scale3dRecipe(recipe.id);
            } else {
                toolsService.removeSelectedRecipe(recipe.id);
                recipe.selected = false;
                toolsService.removeVisuals(recipe.id);
            }
        };

        $scope.$on('handleBroadcast', function () {
            if (toolsService.message.type === toolsService.broadcast.deleteSuccess) {
                removeRecipe(toolsService.message.data);
            }
        });



    }]);
}());
