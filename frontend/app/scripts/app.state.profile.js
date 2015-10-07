/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.profile', ['ui.router']).config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('main.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                resolve: {
                    authorize: ['authorization', function (authorization) {
                        return authorization.authorize();
                    }]
                }
            })
            .state('main.profile.index', {
                url: '/:id',
                resolve: {
                    recipes: ['recipeService', '$stateParams', function (recipeService, $stateParams) {
                        return recipeService.getRecipeListByUser({}, {sort: 'updatedAt DESC'});
                    }],
                    eventquery: function () {
                        return {where: {id: {'!': ''}}, sort: 'updatedAt DESC'};
                    }
                },
                views: {
                    'recipes': {
                        controller: 'MyRecipesCtrl as vm',
                        templateUrl: 'views/listRecipes.html'
                    },
                    'events': {
                        controller: 'EventListCtrl as vm',
                        templateUrl: 'views/event.list.html'
                    }
                }
            });
    }]);
}());

