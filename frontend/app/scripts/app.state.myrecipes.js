/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.myrecipes', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.myrecipes', {
                url: '/myrecipes',
                templateUrl: 'views/myRecipes.html',
                resolve: {
                    authorize: ['authorization', function (authorization) {
                        return authorization.authorize();
                    }]
                }
            })
            .state('main.myrecipes.list', {
                url: '/list',
                resolve: {
                    recipes: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                        return recipeService.getRecipeListByUser({}, {sort: 'updatedAt DESC'});
                    }]
                },
                views: {
                    'display': {
                        controller: 'MyRecipesCtrl as vm',
                        templateUrl: 'views/listRecipes.html'
                    },
                    'tools': {
                        controller: 'RecipesToolsCtrl as vm',
                        templateUrl: 'views/myRecipes.tools.html'
                    }
                }
            })
            .state('main.myrecipes.create', {
                url: '/create',
                views: {
                    'display': {
                        controller: 'RecipeEditorCtrl as vm',
                        templateUrl: 'views/myrecipe.create.html'
                    }
                },
                resolve: {
                    // TODO avoid this empty method
                    recipeToEdit: function () {}
                }
            })
            .state('main.myrecipes.edit', {
                url: '/:name',
                views: {
                    'display': {
                        controller: 'RecipeEditorCtrl as vm',
                        templateUrl: 'views/myrecipe.create.html'
                    }
                },
                resolve: {
                    recipeToEdit: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                        return recipeService.getByName($stateParams.name);
                    }]
                }
            })
            .state('main.myrecipes.imageupload', {
                url: 'upload/:name',
                views: {
                    'display': {
                        controller: 'ImageuploadCtrl as vm',
                        templateUrl: 'views/myrecipe.fileupload.html'
                    }
                },
                resolve: {
                    recipeToEdit: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                        return recipeService.getByName($stateParams.name);
                    }]
                }
            });
    }]);
}());

