/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.recipe', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.recipe', {
                url: '/recipe',
                abstract: true,
                templateUrl: 'views/recipes.html'
            })
            .state('main.recipe.list', {
                url: '/list/:query',
                resolve: {
                    recipes: ['recipeService', '$stateParams', 'queryService', function (recipeService, $stateParams, queryService) {
                        var defaultQuery = {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};

                        return recipeService.getRecipeList(queryService.queryFromUrlParam(defaultQuery, $stateParams.query)).$promise.then(function (recipes) {
                            return recipes;
                        });
                    }]
                },
                views: {
                    'recipelist': {
                        controller: 'RecipesCtrl as vm',
                        templateUrl: 'views/listRecipes.html'
                    }
                }
            })
            .state('main.recipe.detail', {
                url: '/:name',
                resolve: {
                    recipeDetail: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                        return recipeService.getByName($stateParams.name);
                    }]
                },
                views: {
                    'recipedetail': {
                        controller: 'RecipeDetailCtrl as vm',
                        templateUrl: 'views/myRecipe.detail.html'
                    }
                }
            });
    }]);
}());
