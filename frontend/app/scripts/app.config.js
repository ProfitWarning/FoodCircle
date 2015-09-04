(function () {
    'use strict';

    angular.module('foodCircle').config(['$stateProvider', '$urlRouterProvider', 'sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL',
        function ($stateProvider, $urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    templateUrl: '/views/main.html'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    url: '/about',
                    templateUrl: '/views/about.html'
                })
                .state('impressum', {
                    url: '/impressum',
                    templateUrl: '/views/impressum.html'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('login', {
                    url: '/login',
                    templateUrl: '/views/login.html'
                })
                .state('logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl'
                })
                .state('recipe', {
                    url: '/recipe',
                    controller: 'RecipeCtrl as vm',
                    templateUrl: '/views/recipe.html'
                });



            sailsResourceProvider.configuration = {
                verbose: true, // sailsResource will log messages to console
                //prefix: 'myapi', // apply a prefix to all routes
                //socket: io.connect('http://localhost:1337'), // provide your own socket instance,
                origin: 'http://localhost:1337' // change the socket origin
            };

            $authProvider.loginUrl = API_URL + 'auth/';
            $authProvider.signupUrl = API_URL + 'auth/register';

            $httpProvider.interceptors.push('authInterceptor');

        }])
        .constant('API_URL', 'http://localhost:1337/');
}());
