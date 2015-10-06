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

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'authService', 'AUTH_EVENTS', '$rootScope', 'toolsService', '$scope', '$filter', function (recipeService, authService, AUTH_EVENTS, $rootScope, toolsService, $scope, $filter) {

        var vm = this,
            removeRecipe = function (recipeid) {
                var found = $filter('filter')(vm.recipeList, {id: recipeid}, false),
                    pos;
                if (found && found.length > 0) {
                    pos = vm.recipeList.map(function (e) {return e.id;}).indexOf(found[0].id);
                    vm.recipeList.splice(pos, 1);
                }
            };

        vm.selectedRecipes = [];

        recipeService.getRecipeListByUser(authService.currentUser(), {sort: 'updatedAt DESC'}).$promise.then(function (item) {
            vm.recipeList = item;
            vm.showEditBtn = true;
        })
            .catch(function (error) {
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

        $scope.$on('handleBroadcast', function () {
            if (toolsService.message.type === toolsService.broadcast.deleteSuccess) {
                removeRecipe(toolsService.message.data);
            }
        });



    }]);
}());
