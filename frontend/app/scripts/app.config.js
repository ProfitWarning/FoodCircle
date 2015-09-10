(function () {
    'use strict';

    angular.module('foodCircle').config(['$stateProvider', '$urlRouterProvider', 'sailsResourceProvider', '$httpProvider', '$authProvider', 'API_URL', 'localStorageServiceProvider',
        function ($stateProvider, $urlRouterProvider, sailsResourceProvider, $httpProvider, $authProvider, API_URL, localStorageServiceProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/main.html'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('impressum', {
                    url: '/impressum',
                    templateUrl: 'views/impressum.html'
                })
                // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html'
                })
                .state('logout', {
                    url: '/logout',
                    controller: 'LogoutCtrl'
                })
                .state('editrecipe', {
                    url: '/editrecipe',
                    controller: 'RecipeEditorCtrl as vm',
                    templateUrl: 'views/editRecipe.html'
                })
                .state('myrecipes', {
                    url: '/myrecipes',
                    templateUrl: 'views/myRecipes.html'

                })
                .state('myrecipes.list', {
                    url: '/list',
                    views: {
                        'display' : {
                            controller: 'MyRecipesCtrl as vm',
                            templateUrl: 'views/listRecipes.html'
                        },
                        'tools': {
                            controller: 'RecipesToolsCtrl as vm',
                            templateUrl: 'views/myRecipes.tools.html'
                        }
                    }

                })
                .state('myrecipes.create', {
                    url: '/create',
                    views: {
                        'display': {
                            controller: 'RecipeEditorCtrl as vm',
                            templateUrl: 'views/myRecipes.create.html'
                        }
                    }
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

            localStorageServiceProvider.setPrefix('ls');

        }])
        .constant('API_URL', 'http://localhost:1337/')
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .run(['$rootScope', '$location', '$state', '$auth', 'AUTH_EVENTS', function ($rootScope, $location, $state, $auth, AUTH_EVENTS) {

            $rootScope.$on('$stateChangeStart', function (event, toState /*, toParams, fromState, fromParams*/) {

                if (toState.name === 'home' || toState.name === 'login' || toState.name === 'impressum' || toState.name === 'home') {
                    return; // no need to redirect
                }

                // now, redirect only not authenticated
                if (!$auth.isAuthenticated()) {
                    event.preventDefault(); // stop current execution
                    $state.go('login'); // go to login
                }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
                $auth.logout();
                $state.go('login'); // go to login
            });

            $rootScope.$on('$sailsSocketError', function () {

            });
        }]);
}());
