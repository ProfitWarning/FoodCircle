/*global
    angular
*/

(function () {
    'use strict';

    angular.module('routing.main', ['ui.router']).config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise(function ($injector, $location) {
            var state = $injector.get('$state');
            state.go('404');
            return $location.path();
        });

        $stateProvider
            .state('main', {
                abstract: true,
                url: '',
                controller: 'MainCtrl as vm',
                templateUrl: 'views/main.html'
            })
            // HOME STATES AND NESTED VIEWS ========================================
            .state('main.home', {
                url: '/',
                controller: 'HomeCtrl as vm',
                templateUrl: 'views/home.html',
                resolve: {
                    recipeList: ['recipeService', function (recipeService) {
                        return recipeService.getRecipeList({where: {id: {'!': ''}}, mit: 6, sort: 'updatedAt DESC'}).$promise.then(function (recipeList) {
                            return recipeList;
                        });
                    }]
                }
            })
            // ABOUT PAGE  =================================
            .state('main.about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('main.impressum', {
                url: '/impressum',
                templateUrl: 'views/impressum.html'
            })
            // LOGIN PAGE =================================
            .state('main.login', {
                url: '/login',
                templateUrl: 'views/login.html'
            })
            .state('main.logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('404', {
                templateUrl: '/404.html'
            })
            .state('main.error', {
                url: '/error',
                templateUrl: '/error.html',
                controller: 'ErrorpageCtrl as vm',
                params: {
                    error: {}
                }
            });
    }]);
}());
