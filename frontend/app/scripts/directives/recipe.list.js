/**
 * @ngdoc directive
 * @name foodCircle.directive:profileRecipeList
 * @description
 * # profileRecipeList
 */
/*global
    angular
*/

(function () {
    'use strict';
    angular.module('foodCircle').directive('profileRecipeList', ['recipeService', '$log', 'authService', function (recipeService, $log, authService) {

        //<profile-recipe-list recipe-item-click="vm.onRecipeItemClick(event)" recipe-list-query="{}"></profile-recipe-list>
        var controller = function () {
                var vm = this, initRecipes;
                $log.error('recipe directive ctrl');
                vm.onRecipeItemClick = function (recipe) {
                    vm.eventItemClick({recipe: recipe});
                };

                initRecipes = function () {
                    var query = vm.recipeListQuery;
                    recipeService.getRecipeListByUser({}, {sort: 'updatedAt DESC'}).then(function (list) {
                        $log.error('recipe directive list fetsched');
                        vm.recipes = list;
                    });
                };

                initRecipes();
            };

        return {
            restrict: 'EA',
            scope: {
                clickRecipe: '&',
                eventQuery: '='
            },
            templateUrl: 'views/partials/directive.recipe.list.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: {
                recipeItemClick: '&',
                recipeListQuery: '='
            }/*,
            link: function postLink(scope, element, attrs) {

            }*/
        };
    }]);
}());

