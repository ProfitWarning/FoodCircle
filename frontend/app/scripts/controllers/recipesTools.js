/**
 * @ngdoc function
 * @name foodCircle.controller:RecipestoolsCtrl
 * @description
 * # RecipestoolsCtrl
 * Controller of the foodCircle
 */
/*global
    angular
*/

(function () {
    'use strict';

    angular.module('foodCircle').controller('RecipesToolsCtrl', ['jQuery', 'toolsService', 'alert', '$confirm', 'recipeService', function ($, toolsService, alert, $confirm, recipeService) {
        var vm = this;
        vm.listActive = false;

        vm.onListViewClick = function (event) {
            event.preventDefault();
            $('#recipes .item').addClass('list-group-item');
            $('#recipes').addClass('list-view');
            vm.listActive = true;
        };

        vm.onGridViewClick = function (event) {
            event.preventDefault();
            $('#recipes').removeClass('list-view');
            $('#recipes .item').removeClass('list-group-item');
            $('#recipes .item').addClass('grid-group-item');
            vm.listActive = false;
        };

        vm.onDeleteClick = function (event) {
            event.preventDefault();
            if (toolsService.selectedRecipes.length < 1) {
                alert('warning', 'Please select a recipe to delete.');
                return;
            }
            $confirm({
                text: 'Are you sure you want to delete?'
            })
                .then(function () {
                    angular.forEach(toolsService.selectedRecipes, function (recipe, idx) {
                        recipeService.deleteById(recipe.id).then(function (delRecipe) {
                            toolsService.prepForBroadcast({
                                type: toolsService.broadcast.deleteSuccess,
                                data: delRecipe.id
                            });
                            toolsService.selectedRecipes.splice(idx, 1);
                        });
                    });

                });
        };

        vm.selectedRecipesCnt = function () {
            return toolsService.selectedRecipes.length;
        };

    }]);
}());
