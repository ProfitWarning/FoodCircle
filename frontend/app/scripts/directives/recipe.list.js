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
    angular.module('foodCircle').directive('profileRecipeList', ['recipeService', function (recipeService) {

        //<profile-recipe-list recipe-item-click="vm.onRecipeItemClick(event)" recipe-list-query="{}"></profile-recipe-list>
        var controller = function () {
                var vm = this, initRecipes;
                vm.onRecipeItemClick = function (recipe) {
                    vm.recipeItemClick({recipe: recipe});
                };

                initRecipes = function () {
                    /*var query = vm.recipeListQuery;*/
                    recipeService.getRecipeListByUser({}, {sort: 'updatedAt DESC'}).then(function (list) {
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

