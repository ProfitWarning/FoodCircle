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

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'authService', 'AUTH_EVENTS', '$rootScope', 'toolsService', function (recipeService, authService, AUTH_EVENTS, $rootScope, toolsService) {
        var vm = this;
        vm.selectedRecipes = [];

        recipeService.getRecipeListByUser(authService.currentUser(), {sort: 'updatedAt DESC'}).$promise
            .then(function (item) {
                vm.recipeList = item;
                vm.showEditBtn = true;
            })
            .catch(function (error) {
                console.log('MyRecipesCtrl: ' + error.statusCode);
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[error.statusCode], error);
            });


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
    }]);
}());
