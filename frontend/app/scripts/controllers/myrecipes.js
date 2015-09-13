/**
 * @ngdoc function
 * @name foodCircle.controller:MyrecipesCtrl
 * @description
 * # MyrecipesCtrl
 * Controller of the foodCircle
 */
(function () {
    'use strict';

    angular.module('foodCircle').controller('MyRecipesCtrl', ['recipeService', 'authService', 'AUTH_EVENTS', '$rootScope', 'toolsService', function (recipeService, authService, AUTH_EVENTS, $rootScope, toolsService) {
        var vm = this;
        vm.selectedRecipes = [];

        recipeService.getRecipeListByUser(authService.currentUser()).$promise
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


        vm.onSelectRecipe = function (recipe, event) {
            toolsService.selectedRecipes.push(recipe);
        };
    }]);
}());
